import { supabase } from "./supabase"
import { BankAccount, BankTransaction } from "../types"

// Get all connected bank accounts
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  const { data, error } = await supabase
    .from<BankAccount>("bank_accounts")
    .select("*")
  if (error) throw error
  return data || []
}

// Get a specific bank account by ID
export const getBankAccountById = async (id: string): Promise<BankAccount> => {
  const { data, error } = await supabase
    .from<BankAccount>("bank_accounts")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Delete a bank account connection
export const deleteBankAccount = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from<BankAccount>("bank_accounts")
    .delete()
    .eq("id", id)
  if (error) throw error
}

// Get all transactions for a bank account
export const getBankTransactions = async (
  bankAccountId: string,
  params?: { startDate?: string; endDate?: string; matched?: boolean }
): Promise<BankTransaction[]> => {
  let query = supabase
    .from<BankTransaction>("bank_transactions")
    .select("*")
    .eq("bankAccountId", bankAccountId)
  if (params?.startDate) query = query.gte("date", params.startDate)
  if (params?.endDate) query = query.lte("date", params.endDate)
  if (params?.matched !== undefined)
    query = query.eq("isMatched", params.matched)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Create a link token for Plaid Link integration via Edge Function
export const createLinkToken = async (): Promise<{ linkToken: string }> => {
  const { data, error } = await supabase.functions.invoke("create-link-token")
  if (error) throw error
  return data as { linkToken: string }
}

// Exchange public token from Plaid for access token and link bank account
export const exchangePublicToken = async (
  publicToken: string,
  metadata: any
): Promise<BankAccount[]> => {
  const { data, error } = await supabase.functions.invoke(
    "exchange-public-token",
    { publicToken, metadata }
  )
  if (error) throw error
  return data as BankAccount[]
}

// Sync bank account data (transactions & balance) via Edge Function
export const syncBankAccount = async (
  bankAccountId: string
): Promise<{ bankAccount: BankAccount; transactions: BankTransaction[] }> => {
  const { data, error } = await supabase.functions.invoke("sync-bank-account", {
    bankAccountId,
  })
  if (error) throw error
  return data as { bankAccount: BankAccount; transactions: BankTransaction[] }
}

// Match a bank transaction to an internal transaction
export const matchBankTransaction = async (
  bankTransactionId: string,
  transactionId: string
): Promise<BankTransaction> => {
  const { data, error } = await supabase
    .from<BankTransaction>("bank_transactions")
    .update({ transactionId, isMatched: true })
    .eq("id", bankTransactionId)
    .single()
  if (error) throw error
  return data!
}

// Unmatch a bank transaction from an internal transaction
export const unmatchBankTransaction = async (
  bankTransactionId: string
): Promise<BankTransaction> => {
  const { data, error } = await supabase
    .from<BankTransaction>("bank_transactions")
    .update({ transactionId: null, isMatched: false })
    .eq("id", bankTransactionId)
    .single()
  if (error) throw error
  return data!
}

// Create a new internal transaction from a bank transaction
export const createTransactionFromBankTransaction = async (
  bankTransactionId: string,
  data: { description?: string; accountId: string }
): Promise<{ bankTransaction: BankTransaction; transactionId: string }> => {
  const { data: res, error } = await supabase.functions.invoke(
    "create-transaction-from-bank",
    { bankTransactionId, ...data }
  )
  if (error) throw error
  return res as { bankTransaction: BankTransaction; transactionId: string }
}

// Get summary of bank account transaction matching status
export const getBankAccountMatchingSummary = async (
  bankAccountId: string
): Promise<{
  total: number
  matched: number
  unmatched: number
  pending: number
}> => {
  const { data, error } = await supabase.functions.invoke(
    "bank-matching-summary",
    { bankAccountId }
  )
  if (error) throw error
  return data as {
    total: number
    matched: number
    unmatched: number
    pending: number
  }
}

// Update Plaid connection via Edge Function
export const updatePlaidConnection = async (
  bankAccountId: string
): Promise<{ linkToken: string }> => {
  const { data, error } = await supabase.functions.invoke(
    "update-plaid-connection",
    { bankAccountId }
  )
  if (error) throw error
  return data as { linkToken: string }
}
