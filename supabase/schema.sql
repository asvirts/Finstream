-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Enums for account types and invoice/report statuses
create type account_type as enum ('ASSET','LIABILITY','EQUITY','INCOME','EXPENSE');
create type account_subtype as enum (
  'CASH','BANK','ACCOUNTS_RECEIVABLE','INVENTORY','FIXED_ASSET','OTHER_ASSET',
  'ACCOUNTS_PAYABLE','CREDIT_CARD','LOAN','TAX_PAYABLE','OTHER_LIABILITY',
  'RETAINED_EARNINGS','OWNER_EQUITY',
  'SALES','OTHER_INCOME',
  'OPERATING_EXPENSE','PAYROLL','TAX_EXPENSE','OTHER_EXPENSE'
);
create type invoice_status as enum ('DRAFT','SENT','PARTIALLY_PAID','PAID','OVERDUE','CANCELLED');
create type report_type as enum ('PROFIT_LOSS','BALANCE_SHEET','CASH_FLOW','TAX_SUMMARY');

-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  first_name text not null,
  last_name text not null,
  business_name text,
  is_onboarded boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Accounts table
create table accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  type account_type not null,
  subtype account_subtype not null,
  number text,
  description text,
  balance numeric default 0,
  is_active boolean default true,
  is_archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Transactions and journal entries
create table transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  date date not null,
  description text,
  reference text,
  is_reconciled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table journal_entries (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid references transactions(id) on delete cascade,
  account_id uuid references accounts(id) on delete restrict,
  amount numeric not null,
  memo text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Customers and Invoices
create table customers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address jsonb,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table invoices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  invoice_number text unique not null,
  customer_id uuid references customers(id) on delete set null,
  date date not null,
  due_date date,
  notes text,
  terms text,
  tax_rate numeric,
  tax_amount numeric,
  subtotal numeric,
  total numeric,
  amount_paid numeric default 0,
  status invoice_status default 'DRAFT',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table invoice_items (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references invoices(id) on delete cascade,
  description text,
  quantity integer not null,
  price numeric not null,
  amount numeric not null,
  taxable boolean default false
);

-- Attachments
drop table if exists attachments;
create table attachments (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid references transactions(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  file_size integer,
  created_at timestamptz default now()
);

-- Receipts
create table receipts (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid references transactions(id) on delete set null,
  date date,
  vendor text,
  amount numeric,
  tax_amount numeric,
  image_url text,
  notes text,
  ocr_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bank accounts and transactions
create table bank_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  account_id uuid references accounts(id) on delete set null,
  institution_name text,
  account_name text,
  account_type text,
  account_number text,
  routing_number text,
  plaid_access_token text,
  plaid_item_id text,
  balance numeric,
  last_updated timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table bank_transactions (
  id uuid primary key default uuid_generate_v4(),
  bank_account_id uuid references bank_accounts(id) on delete cascade,
  date date,
  description text,
  amount numeric,
  category text,
  pending boolean default false,
  transaction_id uuid references transactions(id) on delete set null,
  is_matched boolean default false,
  plaid_transaction_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reports
create table reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  type report_type not null,
  start_date date,
  end_date date,
  generated_at timestamptz default now(),
  data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create function to auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach update_updated_at trigger to tables
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['users','accounts','transactions','journal_entries','receipts',
    'customers','invoices','invoice_items','bank_accounts',
    'bank_transactions','attachments','reports'] LOOP
    EXECUTE format(
      'CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at();', tbl, tbl
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security and define policies
-- Users
alter table users enable row level security;
create policy user_self_access on users for all using (id = auth.uid()::uuid) with check (id = auth.uid()::uuid);

-- Accounts
alter table accounts enable row level security;
create policy account_user_access on accounts for all using (user_id = auth.uid()::uuid);

-- Transactions
alter table transactions enable row level security;
create policy transaction_user_access on transactions for all using (user_id = auth.uid()::uuid);

-- Journal Entries
alter table journal_entries enable row level security;
create policy journal_entries_user_access on journal_entries for all using (
  exists (
    select 1 from transactions
    where transactions.id = journal_entries.transaction_id
      and transactions.user_id = auth.uid()::uuid
  )
);

-- Receipts
alter table receipts enable row level security;
create policy receipts_user_access on receipts for all using (
  exists (
    select 1 from transactions
    where transactions.id = receipts.transaction_id
      and transactions.user_id = auth.uid()::uuid
  )
);

-- Customers
alter table customers enable row level security;
create policy customers_user_access on customers for all using (user_id = auth.uid()::uuid);

-- Invoices
alter table invoices enable row level security;
create policy invoices_user_access on invoices for all using (user_id = auth.uid()::uuid);

-- Invoice Items
alter table invoice_items enable row level security;
create policy invoice_items_user_access on invoice_items for all using (
  exists (
    select 1 from invoices
    where invoices.id = invoice_items.invoice_id
      and invoices.user_id = auth.uid()::uuid
  )
);

-- Bank Accounts
alter table bank_accounts enable row level security;
create policy bank_accounts_user_access on bank_accounts for all using (user_id = auth.uid()::uuid);

-- Bank Transactions
alter table bank_transactions enable row level security;
create policy bank_transactions_user_access on bank_transactions for all using (
  exists (
    select 1 from bank_accounts
    where bank_accounts.id = bank_transactions.bank_account_id
      and bank_accounts.user_id = auth.uid()::uuid
  )
);

-- Attachments
alter table attachments enable row level security;
create policy attachments_user_access on attachments for all using (
  (transaction_id is not null and exists (
     select 1 from transactions
     where transactions.id = attachments.transaction_id
       and transactions.user_id = auth.uid()::uuid
  ))
  or
  (invoice_id is not null and exists (
     select 1 from invoices
     where invoices.id = attachments.invoice_id
       and invoices.user_id = auth.uid()::uuid
  ))
);

-- Reports
alter table reports enable row level security;
create policy reports_user_access on reports for all using (user_id = auth.uid()::uuid);
