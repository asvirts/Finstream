/**
 * Utility functions for formatting and handling currency values
 */

/**
 * Format a number as currency with dollar sign and two decimal places
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Parse a currency string into a number
 * @param currencyString - The currency string to parse (e.g. "$1,234.56")
 * @returns Number value
 */
export const parseCurrency = (currencyString: string): number => {
  // Remove currency symbols, spaces, and commas
  const cleanedString = currencyString.replace(/[^\d.-]/g, "")
  return parseFloat(cleanedString)
}

/**
 * Calculate tax amount based on a value and tax rate
 * @param amount - Base amount
 * @param taxRate - Tax rate as decimal (e.g. 0.1 for 10%)
 * @returns Tax amount
 */
export const calculateTax = (amount: number, taxRate: number): number => {
  return amount * taxRate
}

/**
 * Format a tax rate as a percentage
 * @param taxRate - Tax rate as decimal (e.g. 0.1 for 10%)
 * @returns Formatted percentage string (e.g. "10%")
 */
export const formatTaxRate = (taxRate: number): string => {
  return `${(taxRate * 100).toFixed(2)}%`
}

/**
 * Calculate subtotal from an array of line items with amount properties
 * @param items - Array of objects with amount property
 * @returns Total sum
 */
export const calculateSubtotal = <T extends { amount: number }>(
  items: T[]
): number => {
  return items.reduce((sum, item) => sum + item.amount, 0)
}

/**
 * Calculate the total with tax
 * @param subtotal - The subtotal amount
 * @param taxRate - Tax rate as decimal
 * @returns Total with tax
 */
export const calculateTotal = (subtotal: number, taxRate: number): number => {
  const taxAmount = calculateTax(subtotal, taxRate)
  return subtotal + taxAmount
}
