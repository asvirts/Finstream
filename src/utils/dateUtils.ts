import { format, parse, isValid, differenceInDays } from "date-fns"

/**
 * Format a date to a string using the specified format
 */
export const formatDate = (
  date: Date | string | number,
  formatString: string = "MMM d, yyyy"
): string => {
  if (!date) return ""

  const dateObj =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date

  return isValid(dateObj) ? format(dateObj, formatString) : ""
}

/**
 * Parse a date string to a Date object using the specified format
 */
export const parseDate = (
  dateString: string,
  formatString: string = "yyyy-MM-dd"
): Date | null => {
  if (!dateString) return null

  const parsed = parse(dateString, formatString, new Date())
  return isValid(parsed) ? parsed : null
}

/**
 * Format a date as YYYY-MM-DD for API requests and database storage
 */
export const formatDateForAPI = (date: Date | string | number): string => {
  return formatDate(date, "yyyy-MM-dd")
}

/**
 * Check if a date is in the past
 */
export const isPastDate = (date: Date | string | number): boolean => {
  const dateObj =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date

  return isValid(dateObj) ? dateObj < new Date() : false
}

/**
 * Check if a date is in the future
 */
export const isFutureDate = (date: Date | string | number): boolean => {
  const dateObj =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date

  return isValid(dateObj) ? dateObj > new Date() : false
}

/**
 * Calculate the days remaining until a future date (or days overdue for a past date)
 * Returns positive number for future dates (days remaining)
 * Returns negative number for past dates (days overdue)
 */
export const daysFromToday = (date: Date | string | number): number => {
  const dateObj =
    typeof date === "string" || typeof date === "number" ? new Date(date) : date

  if (!isValid(dateObj)) return 0

  return differenceInDays(dateObj, new Date())
}

/**
 * Get the start of the current month
 */
export const getStartOfCurrentMonth = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

/**
 * Get the end of the current month
 */
export const getEndOfCurrentMonth = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0)
}

/**
 * Get the start of the current year
 */
export const getStartOfCurrentYear = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), 0, 1)
}

/**
 * Get the end of the current year
 */
export const getEndOfCurrentYear = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), 11, 31)
}
