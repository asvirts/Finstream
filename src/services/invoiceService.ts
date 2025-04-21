import { apiGet, apiPost, apiPut, apiDelete } from "./api"
import { Invoice, InvoiceItem, InvoiceStatus, Customer } from "../types"

interface InvoiceWithItems {
  invoice: Partial<Invoice>
  items: Partial<InvoiceItem>[]
}

/**
 * Get all invoices
 */
export const getInvoices = async (params?: {
  status?: InvoiceStatus
  startDate?: string
  endDate?: string
  customerId?: string
}): Promise<Invoice[]> => {
  try {
    return await apiGet<Invoice[]>("/invoices", { params })
  } catch (error) {
    console.error("Get invoices error:", error)
    throw error
  }
}

/**
 * Get a specific invoice by ID
 */
export const getInvoiceById = async (id: string): Promise<Invoice> => {
  try {
    return await apiGet<Invoice>(`/invoices/${id}`)
  } catch (error) {
    console.error(`Get invoice ${id} error:`, error)
    throw error
  }
}

/**
 * Create a new invoice with items
 */
export const createInvoice = async (
  invoiceData: InvoiceWithItems
): Promise<Invoice> => {
  try {
    return await apiPost<Invoice>("/invoices", invoiceData)
  } catch (error) {
    console.error("Create invoice error:", error)
    throw error
  }
}

/**
 * Update an existing invoice
 */
export const updateInvoice = async (
  id: string,
  invoiceData: InvoiceWithItems
): Promise<Invoice> => {
  try {
    return await apiPut<Invoice>(`/invoices/${id}`, invoiceData)
  } catch (error) {
    console.error(`Update invoice ${id} error:`, error)
    throw error
  }
}

/**
 * Delete an invoice
 */
export const deleteInvoice = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/invoices/${id}`)
  } catch (error) {
    console.error(`Delete invoice ${id} error:`, error)
    throw error
  }
}

/**
 * Mark an invoice as sent
 */
export const markInvoiceAsSent = async (id: string): Promise<Invoice> => {
  try {
    return await apiPut<Invoice>(`/invoices/${id}/status`, {
      status: InvoiceStatus.SENT
    })
  } catch (error) {
    console.error(`Mark invoice ${id} as sent error:`, error)
    throw error
  }
}

/**
 * Mark an invoice as paid
 */
export const markInvoiceAsPaid = async (id: string): Promise<Invoice> => {
  try {
    return await apiPut<Invoice>(`/invoices/${id}/status`, {
      status: InvoiceStatus.PAID
    })
  } catch (error) {
    console.error(`Mark invoice ${id} as paid error:`, error)
    throw error
  }
}

/**
 * Record a payment for an invoice
 */
export const recordInvoicePayment = async (
  invoiceId: string,
  amount: number,
  date: string,
  method?: string,
  notes?: string
): Promise<Invoice> => {
  try {
    return await apiPost<Invoice>(`/invoices/${invoiceId}/payments`, {
      amount,
      date,
      method,
      notes
    })
  } catch (error) {
    console.error(`Record payment for invoice ${invoiceId} error:`, error)
    throw error
  }
}

/**
 * Send an invoice by email
 */
export const sendInvoiceByEmail = async (
  invoiceId: string,
  email: string,
  subject?: string,
  message?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    return await apiPost<{ success: boolean; message: string }>(
      `/invoices/${invoiceId}/send`,
      {
        email,
        subject,
        message
      }
    )
  } catch (error) {
    console.error(`Send invoice ${invoiceId} by email error:`, error)
    throw error
  }
}

/**
 * Generate a PDF for an invoice
 */
export const generateInvoicePdf = async (
  invoiceId: string
): Promise<{ fileUrl: string; fileName: string }> => {
  try {
    return await apiGet<{ fileUrl: string; fileName: string }>(
      `/invoices/${invoiceId}/pdf`
    )
  } catch (error) {
    console.error(`Generate PDF for invoice ${invoiceId} error:`, error)
    throw error
  }
}

/**
 * Get all customers
 */
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    return await apiGet<Customer[]>("/customers")
  } catch (error) {
    console.error("Get customers error:", error)
    throw error
  }
}

/**
 * Get a specific customer by ID
 */
export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    return await apiGet<Customer>(`/customers/${id}`)
  } catch (error) {
    console.error(`Get customer ${id} error:`, error)
    throw error
  }
}

/**
 * Create a new customer
 */
export const createCustomer = async (
  customerData: Partial<Customer>
): Promise<Customer> => {
  try {
    return await apiPost<Customer>("/customers", customerData)
  } catch (error) {
    console.error("Create customer error:", error)
    throw error
  }
}

/**
 * Update an existing customer
 */
export const updateCustomer = async (
  id: string,
  customerData: Partial<Customer>
): Promise<Customer> => {
  try {
    return await apiPut<Customer>(`/customers/${id}`, customerData)
  } catch (error) {
    console.error(`Update customer ${id} error:`, error)
    throw error
  }
}

/**
 * Delete a customer
 */
export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/customers/${id}`)
  } catch (error) {
    console.error(`Delete customer ${id} error:`, error)
    throw error
  }
}

/**
 * Get invoices for a specific customer
 */
export const getCustomerInvoices = async (
  customerId: string
): Promise<Invoice[]> => {
  try {
    return await apiGet<Invoice[]>(`/customers/${customerId}/invoices`)
  } catch (error) {
    console.error(`Get invoices for customer ${customerId} error:`, error)
    throw error
  }
}
