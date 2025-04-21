import { Invoice, InvoiceStatus } from "../../types"

// Invoice State Interface
export interface InvoiceState {
  invoices: Invoice[]
  currentInvoice: Invoice | null
  loading: boolean
  error: string | null
}

// Invoice Action Types
export enum InvoiceActionTypes {
  FETCH_INVOICES_REQUEST = "FETCH_INVOICES_REQUEST",
  FETCH_INVOICES_SUCCESS = "FETCH_INVOICES_SUCCESS",
  FETCH_INVOICES_FAILURE = "FETCH_INVOICES_FAILURE",
  FETCH_INVOICE_REQUEST = "FETCH_INVOICE_REQUEST",
  FETCH_INVOICE_SUCCESS = "FETCH_INVOICE_SUCCESS",
  FETCH_INVOICE_FAILURE = "FETCH_INVOICE_FAILURE",
  CREATE_INVOICE_REQUEST = "CREATE_INVOICE_REQUEST",
  CREATE_INVOICE_SUCCESS = "CREATE_INVOICE_SUCCESS",
  CREATE_INVOICE_FAILURE = "CREATE_INVOICE_FAILURE",
  UPDATE_INVOICE_REQUEST = "UPDATE_INVOICE_REQUEST",
  UPDATE_INVOICE_SUCCESS = "UPDATE_INVOICE_SUCCESS",
  UPDATE_INVOICE_FAILURE = "UPDATE_INVOICE_FAILURE",
  DELETE_INVOICE_REQUEST = "DELETE_INVOICE_REQUEST",
  DELETE_INVOICE_SUCCESS = "DELETE_INVOICE_SUCCESS",
  DELETE_INVOICE_FAILURE = "DELETE_INVOICE_FAILURE",
  SEND_INVOICE_REQUEST = "SEND_INVOICE_REQUEST",
  SEND_INVOICE_SUCCESS = "SEND_INVOICE_SUCCESS",
  SEND_INVOICE_FAILURE = "SEND_INVOICE_FAILURE",
  RECORD_PAYMENT_REQUEST = "RECORD_PAYMENT_REQUEST",
  RECORD_PAYMENT_SUCCESS = "RECORD_PAYMENT_SUCCESS",
  RECORD_PAYMENT_FAILURE = "RECORD_PAYMENT_FAILURE",
  MARK_AS_SENT = "MARK_AS_SENT",
  MARK_AS_PAID = "MARK_AS_PAID",
  MARK_AS_OVERDUE = "MARK_AS_OVERDUE",
  CLEAR_INVOICE_ERROR = "CLEAR_INVOICE_ERROR"
}

// Invoice Actions
interface FetchInvoicesRequestAction {
  type: InvoiceActionTypes.FETCH_INVOICES_REQUEST
}

interface FetchInvoicesSuccessAction {
  type: InvoiceActionTypes.FETCH_INVOICES_SUCCESS
  payload: Invoice[]
}

interface FetchInvoicesFailureAction {
  type: InvoiceActionTypes.FETCH_INVOICES_FAILURE
  payload: string
}

interface FetchInvoiceRequestAction {
  type: InvoiceActionTypes.FETCH_INVOICE_REQUEST
}

interface FetchInvoiceSuccessAction {
  type: InvoiceActionTypes.FETCH_INVOICE_SUCCESS
  payload: Invoice
}

interface FetchInvoiceFailureAction {
  type: InvoiceActionTypes.FETCH_INVOICE_FAILURE
  payload: string
}

interface CreateInvoiceRequestAction {
  type: InvoiceActionTypes.CREATE_INVOICE_REQUEST
}

interface CreateInvoiceSuccessAction {
  type: InvoiceActionTypes.CREATE_INVOICE_SUCCESS
  payload: Invoice
}

interface CreateInvoiceFailureAction {
  type: InvoiceActionTypes.CREATE_INVOICE_FAILURE
  payload: string
}

interface UpdateInvoiceRequestAction {
  type: InvoiceActionTypes.UPDATE_INVOICE_REQUEST
}

interface UpdateInvoiceSuccessAction {
  type: InvoiceActionTypes.UPDATE_INVOICE_SUCCESS
  payload: Invoice
}

interface UpdateInvoiceFailureAction {
  type: InvoiceActionTypes.UPDATE_INVOICE_FAILURE
  payload: string
}

interface DeleteInvoiceRequestAction {
  type: InvoiceActionTypes.DELETE_INVOICE_REQUEST
}

interface DeleteInvoiceSuccessAction {
  type: InvoiceActionTypes.DELETE_INVOICE_SUCCESS
  payload: string // Invoice ID
}

interface DeleteInvoiceFailureAction {
  type: InvoiceActionTypes.DELETE_INVOICE_FAILURE
  payload: string
}

interface SendInvoiceRequestAction {
  type: InvoiceActionTypes.SEND_INVOICE_REQUEST
}

interface SendInvoiceSuccessAction {
  type: InvoiceActionTypes.SEND_INVOICE_SUCCESS
  payload: Invoice
}

interface SendInvoiceFailureAction {
  type: InvoiceActionTypes.SEND_INVOICE_FAILURE
  payload: string
}

interface RecordPaymentRequestAction {
  type: InvoiceActionTypes.RECORD_PAYMENT_REQUEST
}

interface RecordPaymentSuccessAction {
  type: InvoiceActionTypes.RECORD_PAYMENT_SUCCESS
  payload: {
    invoiceId: string
    amountPaid: number
    newStatus: InvoiceStatus
  }
}

interface RecordPaymentFailureAction {
  type: InvoiceActionTypes.RECORD_PAYMENT_FAILURE
  payload: string
}

interface MarkAsSentAction {
  type: InvoiceActionTypes.MARK_AS_SENT
  payload: string // Invoice ID
}

interface MarkAsPaidAction {
  type: InvoiceActionTypes.MARK_AS_PAID
  payload: string // Invoice ID
}

interface MarkAsOverdueAction {
  type: InvoiceActionTypes.MARK_AS_OVERDUE
  payload: string // Invoice ID
}

interface ClearInvoiceErrorAction {
  type: InvoiceActionTypes.CLEAR_INVOICE_ERROR
}

export type InvoiceAction =
  | FetchInvoicesRequestAction
  | FetchInvoicesSuccessAction
  | FetchInvoicesFailureAction
  | FetchInvoiceRequestAction
  | FetchInvoiceSuccessAction
  | FetchInvoiceFailureAction
  | CreateInvoiceRequestAction
  | CreateInvoiceSuccessAction
  | CreateInvoiceFailureAction
  | UpdateInvoiceRequestAction
  | UpdateInvoiceSuccessAction
  | UpdateInvoiceFailureAction
  | DeleteInvoiceRequestAction
  | DeleteInvoiceSuccessAction
  | DeleteInvoiceFailureAction
  | SendInvoiceRequestAction
  | SendInvoiceSuccessAction
  | SendInvoiceFailureAction
  | RecordPaymentRequestAction
  | RecordPaymentSuccessAction
  | RecordPaymentFailureAction
  | MarkAsSentAction
  | MarkAsPaidAction
  | MarkAsOverdueAction
  | ClearInvoiceErrorAction

// Initial state
export const initialInvoiceState: InvoiceState = {
  invoices: [],
  currentInvoice: null,
  loading: false,
  error: null
}

// Invoice Reducer
export const invoiceReducer = (
  state: InvoiceState = initialInvoiceState,
  action: InvoiceAction
): InvoiceState => {
  switch (action.type) {
    case InvoiceActionTypes.FETCH_INVOICES_REQUEST:
    case InvoiceActionTypes.FETCH_INVOICE_REQUEST:
    case InvoiceActionTypes.CREATE_INVOICE_REQUEST:
    case InvoiceActionTypes.UPDATE_INVOICE_REQUEST:
    case InvoiceActionTypes.DELETE_INVOICE_REQUEST:
    case InvoiceActionTypes.SEND_INVOICE_REQUEST:
    case InvoiceActionTypes.RECORD_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case InvoiceActionTypes.FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload,
        error: null
      }

    case InvoiceActionTypes.FETCH_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentInvoice: action.payload,
        error: null
      }

    case InvoiceActionTypes.CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: [...state.invoices, action.payload],
        currentInvoice: action.payload,
        error: null
      }

    case InvoiceActionTypes.UPDATE_INVOICE_SUCCESS:
    case InvoiceActionTypes.SEND_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        ),
        currentInvoice: action.payload,
        error: null
      }

    case InvoiceActionTypes.DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        ),
        currentInvoice:
          state.currentInvoice?.id === action.payload
            ? null
            : state.currentInvoice,
        error: null
      }

    case InvoiceActionTypes.RECORD_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.invoiceId
            ? {
                ...invoice,
                amountPaid: invoice.amountPaid + action.payload.amountPaid,
                status: action.payload.newStatus
              }
            : invoice
        ),
        currentInvoice:
          state.currentInvoice?.id === action.payload.invoiceId
            ? {
                ...state.currentInvoice,
                amountPaid:
                  state.currentInvoice.amountPaid + action.payload.amountPaid,
                status: action.payload.newStatus
              }
            : state.currentInvoice,
        error: null
      }

    case InvoiceActionTypes.MARK_AS_SENT:
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload
            ? { ...invoice, status: InvoiceStatus.SENT }
            : invoice
        ),
        currentInvoice:
          state.currentInvoice?.id === action.payload
            ? { ...state.currentInvoice, status: InvoiceStatus.SENT }
            : state.currentInvoice
      }

    case InvoiceActionTypes.MARK_AS_PAID:
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload
            ? {
                ...invoice,
                status: InvoiceStatus.PAID,
                amountPaid: invoice.total
              }
            : invoice
        ),
        currentInvoice:
          state.currentInvoice?.id === action.payload
            ? {
                ...state.currentInvoice,
                status: InvoiceStatus.PAID,
                amountPaid: state.currentInvoice.total
              }
            : state.currentInvoice
      }

    case InvoiceActionTypes.MARK_AS_OVERDUE:
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload
            ? { ...invoice, status: InvoiceStatus.OVERDUE }
            : invoice
        ),
        currentInvoice:
          state.currentInvoice?.id === action.payload
            ? { ...state.currentInvoice, status: InvoiceStatus.OVERDUE }
            : state.currentInvoice
      }

    case InvoiceActionTypes.FETCH_INVOICES_FAILURE:
    case InvoiceActionTypes.FETCH_INVOICE_FAILURE:
    case InvoiceActionTypes.CREATE_INVOICE_FAILURE:
    case InvoiceActionTypes.UPDATE_INVOICE_FAILURE:
    case InvoiceActionTypes.DELETE_INVOICE_FAILURE:
    case InvoiceActionTypes.SEND_INVOICE_FAILURE:
    case InvoiceActionTypes.RECORD_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case InvoiceActionTypes.CLEAR_INVOICE_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
