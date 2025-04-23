import { supabase } from "./supabase"
import { Account, AccountType, AccountSubtype } from "../types"

// Get all accounts
export const getAccounts = async (): Promise<Account[]> => {
  const { data, error } = await supabase.from<Account>("accounts").select("*")
  if (error) throw error
  return data || []
}

// Get a specific account by ID
export const getAccountById = async (id: string): Promise<Account> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Create a new account
export const createAccount = async (
  accountData: Partial<Account>
): Promise<Account> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .insert(accountData)
    .single()
  if (error) throw error
  return data!
}

// Update an existing account
export const updateAccount = async (
  id: string,
  accountData: Partial<Account>
): Promise<Account> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .update(accountData)
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Delete an account
export const deleteAccount = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from<Account>("accounts")
    .delete()
    .eq("id", id)
  if (error) throw error
}

// Archive an account
export const archiveAccount = async (id: string): Promise<Account> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .update({ isArchived: true })
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Restore an archived account
export const restoreAccount = async (id: string): Promise<Account> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .update({ isArchived: false })
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Get all account types with their subtypes
export const getAccountTypes = async (): Promise<{
  types: AccountType[]
  subtypes: Record<AccountType, AccountSubtype[]>
}> => {
  const types = Object.values(AccountType)
  const subtypes: Record<AccountType, AccountSubtype[]> = {
    [AccountType.ASSET]: [
      AccountSubtype.CASH,
      AccountSubtype.BANK,
      AccountSubtype.ACCOUNTS_RECEIVABLE,
      AccountSubtype.INVENTORY,
      AccountSubtype.FIXED_ASSET,
      AccountSubtype.OTHER_ASSET,
    ],
    [AccountType.LIABILITY]: [
      AccountSubtype.ACCOUNTS_PAYABLE,
      AccountSubtype.CREDIT_CARD,
      AccountSubtype.LOAN,
      AccountSubtype.TAX_PAYABLE,
      AccountSubtype.OTHER_LIABILITY,
    ],
    [AccountType.EQUITY]: [
      AccountSubtype.RETAINED_EARNINGS,
      AccountSubtype.OWNER_EQUITY,
    ],
    [AccountType.INCOME]: [AccountSubtype.SALES, AccountSubtype.OTHER_INCOME],
    [AccountType.EXPENSE]: [
      AccountSubtype.OPERATING_EXPENSE,
      AccountSubtype.PAYROLL,
      AccountSubtype.TAX_EXPENSE,
      AccountSubtype.OTHER_EXPENSE,
    ],
  }
  return { types, subtypes }
}

// Get accounts by type
export const getAccountsByType = async (
  type: AccountType
): Promise<Account[]> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .select("*")
    .eq("type", type)
  if (error) throw error
  return data || []
}

// Get chart of accounts summary with balances
export const getChartOfAccountsSummary = async (): Promise<{
  assets: number
  liabilities: number
  equity: number
  income: number
  expenses: number
}> => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .select("type, balance")
  if (error) throw error
  const summary = {
    assets: 0,
    liabilities: 0,
    equity: 0,
    income: 0,
    expenses: 0,
  }
  data?.forEach((acc) => {
    switch (acc.type) {
      case AccountType.ASSET:
        summary.assets += acc.balance
        break
      case AccountType.LIABILITY:
        summary.liabilities += acc.balance
        break
      case AccountType.EQUITY:
        summary.equity += acc.balance
        break
      case AccountType.INCOME:
        summary.income += acc.balance
        break
      case AccountType.EXPENSE:
        summary.expenses += acc.balance
        break
    }
  })
  return summary
}
