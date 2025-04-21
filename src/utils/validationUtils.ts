/**
 * Check if a string is empty
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value.trim() === ""
}

/**
 * Validate an email address
 */
export const isValidEmail = (email: string): boolean => {
  if (isEmpty(email)) return false

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * Validate a password strength
 * - At least 8 characters
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 */
export const isStrongPassword = (password: string): boolean => {
  if (isEmpty(password) || password.length < 8) return false

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  return hasUppercase && hasLowercase && hasNumber
}

/**
 * Validate a phone number (basic validation)
 */
export const isValidPhone = (phone: string): boolean => {
  if (isEmpty(phone)) return false

  // Remove any non-digit characters
  const digitsOnly = phone.replace(/\D/g, "")

  // Check if we have a reasonable number of digits
  return digitsOnly.length >= 10 && digitsOnly.length <= 15
}

/**
 * Validate a positive number (greater than 0)
 */
export const isPositiveNumber = (value: number | string): boolean => {
  const num = typeof value === "string" ? parseFloat(value) : value
  return !isNaN(num) && num > 0
}

/**
 * Validate a non-negative number (greater than or equal to 0)
 */
export const isNonNegativeNumber = (value: number | string): boolean => {
  const num = typeof value === "string" ? parseFloat(value) : value
  return !isNaN(num) && num >= 0
}

/**
 * Validate that a transaction's journal entries balance (debits equal credits)
 * For accounting transactions, the sum of all entries should equal zero
 * (Debits are positive, credits are negative)
 */
export const doesTransactionBalance = (amounts: number[]): boolean => {
  if (!amounts || !amounts.length) return false

  const sum = amounts.reduce((total, amount) => total + (amount || 0), 0)

  // Allow for small floating point errors in calculations
  return Math.abs(sum) < 0.001
}

/**
 * Validate a date string in ISO format (YYYY-MM-DD)
 */
export const isValidDateString = (dateString: string): boolean => {
  if (isEmpty(dateString)) return false

  // Check if the string follows the ISO format
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  // Check if it's a valid date
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 * Validate tax rate (should be between 0 and 100)
 */
export const isValidTaxRate = (rate: number): boolean => {
  return !isNaN(rate) && rate >= 0 && rate <= 100
}

/**
 * Validate account number (alphanumeric, optional dashes/spaces)
 */
export const isValidAccountNumber = (accountNumber: string): boolean => {
  if (isEmpty(accountNumber)) return false

  // Allow alphanumeric characters, dashes, and spaces
  const regex = /^[a-zA-Z0-9\-\s]+$/
  return regex.test(accountNumber)
}

/**
 * Validate invoice number (alphanumeric, optional dashes/periods)
 */
export const isValidInvoiceNumber = (invoiceNumber: string): boolean => {
  if (isEmpty(invoiceNumber)) return false

  // Allow alphanumeric characters, dashes, and periods
  const regex = /^[a-zA-Z0-9\-\.]+$/
  return regex.test(invoiceNumber)
}
