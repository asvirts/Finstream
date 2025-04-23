import { supabase } from "./supabase"
import { Transaction, JournalEntry } from "../types"

// Get all transactions with journal entries
export const getTransactions = async (params?: {
  startDate?: string
  endDate?: string
  accountId?: string
}): Promise<Transaction[]> => {
  let query = supabase
    .from<Transaction>("transactions")
    .select("*, journal_entries(*)")
  if (params?.startDate) query = query.gte("date", params.startDate)
  if (params?.endDate) query = query.lte("date", params.endDate)
  if (params?.accountId)
    query = query.eq("journal_entries.accountId", params.accountId)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Get a specific transaction by ID
export const getTransactionById = async (id: string): Promise<Transaction> => {
  const { data, error } = await supabase
    .from<Transaction>("transactions")
    .select("*, journal_entries(*)")
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Create a new transaction with journal entries
export const createTransaction = async ({
  transaction,
  entries,
}: {
  transaction: Partial<Transaction>
  entries: Partial<JournalEntry>[]
}): Promise<Transaction> => {
  // Insert transaction
  const { data: trx, error: trxError } = await supabase
    .from<Transaction>("transactions")
    .insert(transaction)
    .single()
  if (trxError || !trx) throw trxError
  // Insert journal entries
  const entriesToInsert = entries.map((e) => ({ ...e, transactionId: trx.id }))
  const { error: entriesError } = await supabase
    .from<JournalEntry>("journal_entries")
    .insert(entriesToInsert)
  if (entriesError) throw entriesError
  return getTransactionById(trx.id)
}

// Update an existing transaction with journal entries
export const updateTransaction = async (
  id: string,
  {
    transaction,
    entries,
  }: { transaction: Partial<Transaction>; entries: Partial<JournalEntry>[] }
): Promise<Transaction> => {
  // Update transaction
  const { error: trxError } = await supabase
    .from<Transaction>("transactions")
    .update(transaction)
    .eq("id", id)
  if (trxError) throw trxError
  // Delete existing entries
  await supabase
    .from<JournalEntry>("journal_entries")
    .delete()
    .eq("transactionId", id)
  // Insert new entries
  const entriesToInsert = entries.map((e) => ({ ...e, transactionId: id }))
  const { error: entriesError } = await supabase
    .from<JournalEntry>("journal_entries")
    .insert(entriesToInsert)
  if (entriesError) throw entriesError
  return getTransactionById(id)
}

// Delete a transaction and its entries
export const deleteTransaction = async (id: string): Promise<void> => {
  await supabase
    .from<JournalEntry>("journal_entries")
    .delete()
    .eq("transactionId", id)
  const { error } = await supabase
    .from<Transaction>("transactions")
    .delete()
    .eq("id", id)
  if (error) throw error
}

// Reconcile or unreconcile a transaction
export const reconcileTransaction = async (
  id: string,
  isReconciled: boolean
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from<Transaction>("transactions")
    .update({ isReconciled })
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}
