import { apiGet, apiPost, apiPut, apiDelete } from "./api"
import { BankAccount, BankTransaction } from "../types"

/**
 * Get all connected bank accounts
 */
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  try {
    return await apiGet<BankAccount[]>("/bank/accounts")
  } catch (error) {
    console.error("Get bank accounts error:", error)
    throw error
  }
}

/**
 * Get a specific bank account by ID
 */
export const getBankAccountById = async (id: string): Promise<BankAccount> => {
  try {
    return await apiGet<BankAccount>(`/bank/accounts/${id}`)
  } catch (error) {
    console.error(`Get bank account ${id} error:`, error)
    throw error
  }
}

/**
 * Delete a bank account connection
 */
export const deleteBankAccount = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/bank/accounts/${id}`)
  } catch (error) {
    console.error(`Delete bank account ${id} error:`, error)
    throw error
  }
}

/**
 * Get all transactions for a bank account
 */
export const getBankTransactions = async (
  bankAccountId: string,
  params?: {
    startDate?: string
    endDate?: string
    matched?: boolean
  }
): Promise<BankTransaction[]> => {
  try {
    return await apiGet<BankTransaction[]>(
      `/bank/accounts/${bankAccountId}/transactions`,
      {
        params
      }
    )
  } catch (error) {
    console.error(
      `Get bank transactions for account ${bankAccountId} error:`,
      error
    )
    throw error
  }
}

/**
 * Create a link token for Plaid Link integration
 */
export const createLinkToken = async (): Promise<{ linkToken: string }> => {
  try {
    return await apiPost<{ linkToken: string }>("/bank/create-link-token")
  } catch (error) {
    console.error("Create link token error:", error)
    throw error
  }
}

/**
 * Exchange public token from Plaid for access token and link bank account
 */
export const exchangePublicToken = async (
  publicToken: string,
  metadata: {
    institution: {
      name: string
      institution_id: string
    }
    accounts: Array<{
      id: string
      name: string
      type: string
      subtype: string
      mask: string
    }>
  }
): Promise<BankAccount[]> => {
  try {
    return await apiPost<BankAccount[]>("/bank/exchange-public-token", {
      publicToken,
      metadata
    })
  } catch (error) {
    console.error("Exchange public token error:", error)
    throw error
  }
}

/**
 * Sync bank account data to refresh transactions and balance
 */
export const syncBankAccount = async (
  bankAccountId: string
): Promise<{
  bankAccount: BankAccount
  transactions: BankTransaction[]
  added: number
  modified: number
  removed: number
}> => {
  try {
    return await apiPost<{
      bankAccount: BankAccount
      transactions: BankTransaction[]
      added: number
      modified: number
      removed: number
    }>(`/bank/accounts/${bankAccountId}/sync`)
  } catch (error) {
    console.error(`Sync bank account ${bankAccountId} error:`, error)
    throw error
  }
}

/**
 * Match a bank transaction to an internal transaction
 */
export const matchBankTransaction = async (
  bankTransactionId: string,
  transactionId: string
): Promise<BankTransaction> => {
  try {
    return await apiPut<BankTransaction>(
      `/bank/transactions/${bankTransactionId}/match`,
      {
        transactionId
      }
    )
  } catch (error) {
    console.error(`Match bank transaction ${bankTransactionId} error:`, error)
    throw error
  }
}

/**
 * Unmatch a bank transaction from an internal transaction
 */
export const unmatchBankTransaction = async (
  bankTransactionId: string
): Promise<BankTransaction> => {
  try {
    return await apiPut<BankTransaction>(
      `/bank/transactions/${bankTransactionId}/unmatch`,
      {}
    )
  } catch (error) {
    console.error(`Unmatch bank transaction ${bankTransactionId} error:`, error)
    throw error
  }
}

/**
 * Create a new transaction from a bank transaction
 */
export const createTransactionFromBankTransaction = async (
  bankTransactionId: string,
  data: {
    description?: string
    accountId: string
  }
): Promise<{ bankTransaction: BankTransaction; transactionId: string }> => {
  try {
    return await apiPost<{
      bankTransaction: BankTransaction
      transactionId: string
    }>(`/bank/transactions/${bankTransactionId}/create-transaction`, data)
  } catch (error) {
    console.error(
      `Create transaction from bank transaction ${bankTransactionId} error:`,
      error
    )
    throw error
  }
}

/**
 * Get summary of bank account transaction matching status
 */
export const getBankAccountMatchingSummary = async (
  bankAccountId: string
): Promise<{
  total: number
  matched: number
  unmatched: number
  pending: number
}> => {
  try {
    return await apiGet<{
      total: number
      matched: number
      unmatched: number
      pending: number
    }>(`/bank/accounts/${bankAccountId}/matching-summary`)
  } catch (error) {
    console.error(
      `Get bank account ${bankAccountId} matching summary error:`,
      error
    )
    throw error
  }
}

/**
 * Update Plaid credentials if connection requires update
 */
export const updatePlaidConnection = async (
  bankAccountId: string
): Promise<{ linkToken: string }> => {
  try {
    return await apiPost<{ linkToken: string }>(
      `/bank/accounts/${bankAccountId}/update-connection`
    )
  } catch (error) {
    console.error(
      `Update Plaid connection for bank account ${bankAccountId} error:`,
      error
    )
    throw error
  }
}
