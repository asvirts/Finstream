import { apiGet, apiPost, apiPut, apiDelete } from "./api"
import { Account, AccountType, AccountSubtype } from "../types"

/**
 * Get all accounts
 */
export const getAccounts = async (): Promise<Account[]> => {
  try {
    return await apiGet<Account[]>("/accounts")
  } catch (error) {
    console.error("Get accounts error:", error)
    throw error
  }
}

/**
 * Get a specific account by ID
 */
export const getAccountById = async (id: string): Promise<Account> => {
  try {
    return await apiGet<Account>(`/accounts/${id}`)
  } catch (error) {
    console.error(`Get account ${id} error:`, error)
    throw error
  }
}

/**
 * Create a new account
 */
export const createAccount = async (
  accountData: Partial<Account>
): Promise<Account> => {
  try {
    return await apiPost<Account>("/accounts", accountData)
  } catch (error) {
    console.error("Create account error:", error)
    throw error
  }
}

/**
 * Update an existing account
 */
export const updateAccount = async (
  id: string,
  accountData: Partial<Account>
): Promise<Account> => {
  try {
    return await apiPut<Account>(`/accounts/${id}`, accountData)
  } catch (error) {
    console.error(`Update account ${id} error:`, error)
    throw error
  }
}

/**
 * Delete an account
 */
export const deleteAccount = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/accounts/${id}`)
  } catch (error) {
    console.error(`Delete account ${id} error:`, error)
    throw error
  }
}

/**
 * Archive an account
 */
export const archiveAccount = async (id: string): Promise<Account> => {
  try {
    return await apiPut<Account>(`/accounts/${id}/archive`, {
      isArchived: true
    })
  } catch (error) {
    console.error(`Archive account ${id} error:`, error)
    throw error
  }
}

/**
 * Restore an archived account
 */
export const restoreAccount = async (id: string): Promise<Account> => {
  try {
    return await apiPut<Account>(`/accounts/${id}/archive`, {
      isArchived: false
    })
  } catch (error) {
    console.error(`Restore account ${id} error:`, error)
    throw error
  }
}

/**
 * Get all account types with their subtypes
 * This is useful for account creation/editing UI
 */
export const getAccountTypes = async (): Promise<{
  types: AccountType[]
  subtypes: Record<AccountType, AccountSubtype[]>
}> => {
  try {
    return await apiGet<{
      types: AccountType[]
      subtypes: Record<AccountType, AccountSubtype[]>
    }>("/accounts/types")
  } catch (error) {
    console.error("Get account types error:", error)
    throw error
  }
}

/**
 * Get accounts by type
 */
export const getAccountsByType = async (
  type: AccountType
): Promise<Account[]> => {
  try {
    return await apiGet<Account[]>(`/accounts/type/${type}`)
  } catch (error) {
    console.error(`Get accounts by type ${type} error:`, error)
    throw error
  }
}

/**
 * Get chart of accounts summary with balances
 */
export const getChartOfAccountsSummary = async (): Promise<{
  assets: number
  liabilities: number
  equity: number
  income: number
  expenses: number
}> => {
  try {
    return await apiGet<{
      assets: number
      liabilities: number
      equity: number
      income: number
      expenses: number
    }>("/accounts/summary")
  } catch (error) {
    console.error("Get chart of accounts summary error:", error)
    throw error
  }
}
