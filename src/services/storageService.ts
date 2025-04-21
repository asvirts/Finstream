import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

/**
 * Keys for stored data
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  SETTINGS: "app_settings",
  RECENT_ACCOUNTS: "recent_accounts",
  RECENT_TRANSACTIONS: "recent_transactions"
}

/**
 * Securely store a value
 * Uses SecureStore on native platforms and AsyncStorage on web
 */
export const secureStore = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value)
    } else {
      await SecureStore.setItemAsync(key, value)
    }
  } catch (error) {
    console.error(`Error storing ${key}:`, error)
    throw error
  }
}

/**
 * Securely retrieve a value
 * Uses SecureStore on native platforms and AsyncStorage on web
 */
export const secureRetrieve = async (key: string): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(key)
    } else {
      return await SecureStore.getItemAsync(key)
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error)
    throw error
  }
}

/**
 * Remove a securely stored value
 */
export const secureRemove = async (key: string): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key)
    } else {
      await SecureStore.deleteItemAsync(key)
    }
  } catch (error) {
    console.error(`Error removing ${key}:`, error)
    throw error
  }
}

/**
 * Store a JSON object
 */
export const storeObject = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.error(`Error storing object ${key}:`, error)
    throw error
  }
}

/**
 * Retrieve a JSON object
 */
export const retrieveObject = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.error(`Error retrieving object ${key}:`, error)
    throw error
  }
}

/**
 * Store user settings
 */
export const storeSettings = async (settings: any): Promise<void> => {
  await storeObject(STORAGE_KEYS.SETTINGS, settings)
}

/**
 * Retrieve user settings
 */
export const retrieveSettings = async (): Promise<any> => {
  return await retrieveObject(STORAGE_KEYS.SETTINGS)
}

/**
 * Store user data locally for quick access
 */
export const storeUserData = async (userData: any): Promise<void> => {
  await storeObject(STORAGE_KEYS.USER_DATA, userData)
}

/**
 * Retrieve user data
 */
export const retrieveUserData = async (): Promise<any> => {
  return await retrieveObject(STORAGE_KEYS.USER_DATA)
}

/**
 * Clear all stored data (for logout)
 */
export const clearAllStoredData = async (): Promise<void> => {
  const keys = Object.values(STORAGE_KEYS)

  for (const key of keys) {
    if (Platform.OS === "web" || key !== STORAGE_KEYS.AUTH_TOKEN) {
      await AsyncStorage.removeItem(key)
    } else {
      await SecureStore.deleteItemAsync(key)
    }
  }
}

/**
 * Store recently used accounts for quick access
 */
export const storeRecentAccounts = async (
  accountIds: string[]
): Promise<void> => {
  await storeObject(STORAGE_KEYS.RECENT_ACCOUNTS, accountIds)
}

/**
 * Retrieve recently used accounts
 */
export const retrieveRecentAccounts = async (): Promise<string[]> => {
  const accounts = await retrieveObject<string[]>(STORAGE_KEYS.RECENT_ACCOUNTS)
  return accounts || []
}

/**
 * Store recently created transactions for quick access
 */
export const storeRecentTransactions = async (
  transactionIds: string[]
): Promise<void> => {
  await storeObject(STORAGE_KEYS.RECENT_TRANSACTIONS, transactionIds)
}

/**
 * Retrieve recently created transactions
 */
export const retrieveRecentTransactions = async (): Promise<string[]> => {
  const transactions = await retrieveObject<string[]>(
    STORAGE_KEYS.RECENT_TRANSACTIONS
  )
  return transactions || []
}
