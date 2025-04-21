import { apiGet, apiPost, apiPut, apiDelete } from "./api"
import { Transaction, JournalEntry } from "../types"

interface TransactionWithEntries {
  transaction: Partial<Transaction>
  entries: Partial<JournalEntry>[]
}

/**
 * Get all transactions
 */
export const getTransactions = async (params?: {
  startDate?: string
  endDate?: string
  accountId?: string
}): Promise<Transaction[]> => {
  try {
    return await apiGet<Transaction[]>("/transactions", { params })
  } catch (error) {
    console.error("Get transactions error:", error)
    throw error
  }
}

/**
 * Get a specific transaction by ID
 */
export const getTransactionById = async (id: string): Promise<Transaction> => {
  try {
    return await apiGet<Transaction>(`/transactions/${id}`)
  } catch (error) {
    console.error(`Get transaction ${id} error:`, error)
    throw error
  }
}

/**
 * Create a new transaction with journal entries
 */
export const createTransaction = async (
  transactionData: TransactionWithEntries
): Promise<Transaction> => {
  try {
    return await apiPost<Transaction>("/transactions", transactionData)
  } catch (error) {
    console.error("Create transaction error:", error)
    throw error
  }
}

/**
 * Update an existing transaction
 */
export const updateTransaction = async (
  id: string,
  transactionData: TransactionWithEntries
): Promise<Transaction> => {
  try {
    return await apiPut<Transaction>(`/transactions/${id}`, transactionData)
  } catch (error) {
    console.error(`Update transaction ${id} error:`, error)
    throw error
  }
}

/**
 * Delete a transaction
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/transactions/${id}`)
  } catch (error) {
    console.error(`Delete transaction ${id} error:`, error)
    throw error
  }
}

/**
 * Mark a transaction as reconciled
 */
export const reconcileTransaction = async (
  id: string
): Promise<Transaction> => {
  try {
    return await apiPut<Transaction>(`/transactions/${id}/reconcile`, {
      isReconciled: true
    })
  } catch (error) {
    console.error(`Reconcile transaction ${id} error:`, error)
    throw error
  }
}

/**
 * Mark a transaction as unreconciled
 */
export const unreconcileTransaction = async (
  id: string
): Promise<Transaction> => {
  try {
    return await apiPut<Transaction>(`/transactions/${id}/reconcile`, {
      isReconciled: false
    })
  } catch (error) {
    console.error(`Unreconcile transaction ${id} error:`, error)
    throw error
  }
}

/**
 * Upload an attachment to a transaction
 */
export const uploadTransactionAttachment = async (
  transactionId: string,
  file: FormData
): Promise<{ id: string; fileUrl: string; fileName: string }> => {
  try {
    return await apiPost<{ id: string; fileUrl: string; fileName: string }>(
      `/transactions/${transactionId}/attachments`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  } catch (error) {
    console.error(
      `Upload attachment for transaction ${transactionId} error:`,
      error
    )
    throw error
  }
}

/**
 * Remove an attachment from a transaction
 */
export const removeTransactionAttachment = async (
  transactionId: string,
  attachmentId: string
): Promise<void> => {
  try {
    await apiDelete(
      `/transactions/${transactionId}/attachments/${attachmentId}`
    )
  } catch (error) {
    console.error(
      `Remove attachment ${attachmentId} from transaction ${transactionId} error:`,
      error
    )
    throw error
  }
}

/**
 * Get account statement (all transactions for an account)
 */
export const getAccountStatement = async (
  accountId: string,
  params?: {
    startDate?: string
    endDate?: string
  }
): Promise<{
  transactions: Transaction[]
  startingBalance: number
  endingBalance: number
}> => {
  try {
    return await apiGet<{
      transactions: Transaction[]
      startingBalance: number
      endingBalance: number
    }>(`/transactions/account/${accountId}/statement`, { params })
  } catch (error) {
    console.error(`Get account statement for ${accountId} error:`, error)
    throw error
  }
}
