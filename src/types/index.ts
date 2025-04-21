// Core Data Types for Finstream Accounting App

export enum AccountType {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  EQUITY = "EQUITY",
  INCOME = "INCOME",
  EXPENSE = "EXPENSE"
}

export enum AccountSubtype {
  // Asset subtypes
  CASH = "CASH",
  BANK = "BANK",
  ACCOUNTS_RECEIVABLE = "ACCOUNTS_RECEIVABLE",
  INVENTORY = "INVENTORY",
  FIXED_ASSET = "FIXED_ASSET",
  OTHER_ASSET = "OTHER_ASSET",

  // Liability subtypes
  ACCOUNTS_PAYABLE = "ACCOUNTS_PAYABLE",
  CREDIT_CARD = "CREDIT_CARD",
  LOAN = "LOAN",
  TAX_PAYABLE = "TAX_PAYABLE",
  OTHER_LIABILITY = "OTHER_LIABILITY",

  // Equity subtypes
  RETAINED_EARNINGS = "RETAINED_EARNINGS",
  OWNER_EQUITY = "OWNER_EQUITY",

  // Income subtypes
  SALES = "SALES",
  OTHER_INCOME = "OTHER_INCOME",

  // Expense subtypes
  OPERATING_EXPENSE = "OPERATING_EXPENSE",
  PAYROLL = "PAYROLL",
  TAX_EXPENSE = "TAX_EXPENSE",
  OTHER_EXPENSE = "OTHER_EXPENSE"
}

export interface Account {
  id: string
  name: string
  type: AccountType
  subtype: AccountSubtype
  number?: string
  description?: string
  balance: number
  isActive: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  date: Date
  description: string
  reference?: string
  entries: JournalEntry[]
  attachments?: Attachment[]
  isReconciled: boolean
  createdAt: Date
  updatedAt: Date
}

export interface JournalEntry {
  id: string
  transactionId: string
  accountId: string
  amount: number // Positive for debits, negative for credits
  memo?: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId: string
  customerName: string
  date: Date
  dueDate: Date
  items: InvoiceItem[]
  notes?: string
  terms?: string
  taxRate?: number
  taxAmount?: number
  subtotal: number
  total: number
  amountPaid: number
  status: InvoiceStatus
  createdAt: Date
  updatedAt: Date
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED"
}

export interface InvoiceItem {
  id: string
  invoiceId: string
  description: string
  quantity: number
  price: number
  amount: number
  taxable: boolean
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: Address
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street1: string
  street2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface BankAccount {
  id: string
  accountId: string // Reference to the corresponding Account
  institutionName: string
  accountName: string
  accountType: string
  accountNumber: string // Last 4 digits
  routingNumber?: string
  plaidAccessToken?: string
  plaidItemId?: string
  balance: number
  lastUpdated: Date
}

export interface BankTransaction {
  id: string
  bankAccountId: string
  date: Date
  description: string
  amount: number
  category?: string
  pending: boolean
  transactionId?: string // Reference to matched internal transaction
  isMatched: boolean
  plaidTransactionId: string
}

export interface Receipt {
  id: string
  transactionId?: string
  date: Date
  vendor: string
  amount: number
  taxAmount?: number
  imageUrl: string
  notes?: string
  ocrData?: any
  createdAt: Date
  updatedAt: Date
}

export interface Attachment {
  id: string
  transactionId?: string
  invoiceId?: string
  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number
  createdAt: Date
}

export interface Report {
  id: string
  name: string
  type: ReportType
  startDate: Date
  endDate: Date
  generatedAt: Date
  data: any
}

export enum ReportType {
  PROFIT_LOSS = "PROFIT_LOSS",
  BALANCE_SHEET = "BALANCE_SHEET",
  CASH_FLOW = "CASH_FLOW",
  TAX_SUMMARY = "TAX_SUMMARY"
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  businessName?: string
  isOnboarded: boolean
}

export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
