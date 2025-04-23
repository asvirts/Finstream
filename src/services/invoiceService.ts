import { supabase } from "./supabase"
import { Invoice, InvoiceItem, InvoiceStatus, Customer } from "../types"

// Get all invoices with items
export const getInvoices = async (params?: {
  status?: InvoiceStatus
  startDate?: string
  endDate?: string
  customerId?: string
}): Promise<Invoice[]> => {
  let query = supabase.from<Invoice>("invoices").select("*, invoice_items(*)")
  if (params?.status) query = query.eq("status", params.status)
  if (params?.startDate) query = query.gte("date", params.startDate)
  if (params?.endDate) query = query.lte("date", params.endDate)
  if (params?.customerId) query = query.eq("customerId", params.customerId)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Get a specific invoice by ID
export const getInvoiceById = async (id: string): Promise<Invoice> => {
  const { data, error } = await supabase
    .from<Invoice>("invoices")
    .select("*, invoice_items(*)")
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Create a new invoice with items
export const createInvoice = async ({
  invoice,
  items,
}: {
  invoice: Partial<Invoice>
  items: Partial<InvoiceItem>[]
}): Promise<Invoice> => {
  const { data: inv, error: invError } = await supabase
    .from<Invoice>("invoices")
    .insert(invoice)
    .single()
  if (invError || !inv) throw invError
  const toInsert = items.map((i) => ({ ...i, invoiceId: inv.id }))
  const { error: itemsError } = await supabase
    .from<InvoiceItem>("invoice_items")
    .insert(toInsert)
  if (itemsError) throw itemsError
  return getInvoiceById(inv.id)
}

// Update an existing invoice with items
export const updateInvoice = async (
  id: string,
  {
    invoice,
    items,
  }: { invoice: Partial<Invoice>; items: Partial<InvoiceItem>[] }
): Promise<Invoice> => {
  const { error: invError } = await supabase
    .from<Invoice>("invoices")
    .update(invoice)
    .eq("id", id)
  if (invError) throw invError
  await supabase.from<InvoiceItem>("invoice_items").delete().eq("invoiceId", id)
  const toInsert = items.map((i) => ({ ...i, invoiceId: id }))
  const { error: itemsError } = await supabase
    .from<InvoiceItem>("invoice_items")
    .insert(toInsert)
  if (itemsError) throw itemsError
  return getInvoiceById(id)
}

// Delete an invoice and its items
export const deleteInvoice = async (id: string): Promise<void> => {
  await supabase.from<InvoiceItem>("invoice_items").delete().eq("invoiceId", id)
  const { error } = await supabase
    .from<Invoice>("invoices")
    .delete()
    .eq("id", id)
  if (error) throw error
}

// Mark invoice status
export const markInvoiceAsSent = async (id: string): Promise<Invoice> => {
  const { data, error } = await supabase
    .from<Invoice>("invoices")
    .update({ status: InvoiceStatus.SENT })
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

export const markInvoiceAsPaid = async (id: string): Promise<Invoice> => {
  const { data, error } = await supabase
    .from<Invoice>("invoices")
    .update({
      status: InvoiceStatus.PAID,
      amountPaid: supabase.rpc("invoice_paid_amount", { invoice_id: id }),
    })
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Get all customers
export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase.from<Customer>("customers").select("*")
  if (error) throw error
  return data || []
}

// Get a specific customer by ID
export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data, error } = await supabase
    .from<Customer>("customers")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Create a new customer
export const createCustomer = async (
  customerData: Partial<Customer>
): Promise<Customer> => {
  const { data, error } = await supabase
    .from<Customer>("customers")
    .insert(customerData)
    .single()
  if (error) throw error
  return data!
}

// Update an existing customer
export const updateCustomer = async (
  id: string,
  customerData: Partial<Customer>
): Promise<Customer> => {
  const { data, error } = await supabase
    .from<Customer>("customers")
    .update(customerData)
    .eq("id", id)
    .single()
  if (error) throw error
  return data!
}

// Delete a customer
export const deleteCustomer = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from<Customer>("customers")
    .delete()
    .eq("id", id)
  if (error) throw error
}

// Get invoices for a specific customer
export const getCustomerInvoices = async (
  customerId: string
): Promise<Invoice[]> => {
  const { data, error } = await supabase
    .from<Invoice>("invoices")
    .select("*")
    .eq("customerId", customerId)
  if (error) throw error
  return data || []
}
