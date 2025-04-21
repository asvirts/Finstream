import { Transaction } from "../../types"

// Transaction State Interface
export interface TransactionState {
  transactions: Transaction[]
  currentTransaction: Transaction | null
  loading: boolean
  error: string | null
}

// Transaction Action Types
export enum TransactionActionTypes {
  FETCH_TRANSACTIONS_REQUEST = "FETCH_TRANSACTIONS_REQUEST",
  FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS",
  FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE",
  FETCH_TRANSACTION_REQUEST = "FETCH_TRANSACTION_REQUEST",
  FETCH_TRANSACTION_SUCCESS = "FETCH_TRANSACTION_SUCCESS",
  FETCH_TRANSACTION_FAILURE = "FETCH_TRANSACTION_FAILURE",
  CREATE_TRANSACTION_REQUEST = "CREATE_TRANSACTION_REQUEST",
  CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS",
  CREATE_TRANSACTION_FAILURE = "CREATE_TRANSACTION_FAILURE",
  UPDATE_TRANSACTION_REQUEST = "UPDATE_TRANSACTION_REQUEST",
  UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS",
  UPDATE_TRANSACTION_FAILURE = "UPDATE_TRANSACTION_FAILURE",
  DELETE_TRANSACTION_REQUEST = "DELETE_TRANSACTION_REQUEST",
  DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS",
  DELETE_TRANSACTION_FAILURE = "DELETE_TRANSACTION_FAILURE",
  RECONCILE_TRANSACTION = "RECONCILE_TRANSACTION",
  CLEAR_TRANSACTION_ERROR = "CLEAR_TRANSACTION_ERROR"
}

// Transaction Actions
interface FetchTransactionsRequestAction {
  type: TransactionActionTypes.FETCH_TRANSACTIONS_REQUEST
}

interface FetchTransactionsSuccessAction {
  type: TransactionActionTypes.FETCH_TRANSACTIONS_SUCCESS
  payload: Transaction[]
}

interface FetchTransactionsFailureAction {
  type: TransactionActionTypes.FETCH_TRANSACTIONS_FAILURE
  payload: string
}

interface FetchTransactionRequestAction {
  type: TransactionActionTypes.FETCH_TRANSACTION_REQUEST
}

interface FetchTransactionSuccessAction {
  type: TransactionActionTypes.FETCH_TRANSACTION_SUCCESS
  payload: Transaction
}

interface FetchTransactionFailureAction {
  type: TransactionActionTypes.FETCH_TRANSACTION_FAILURE
  payload: string
}

interface CreateTransactionRequestAction {
  type: TransactionActionTypes.CREATE_TRANSACTION_REQUEST
}

interface CreateTransactionSuccessAction {
  type: TransactionActionTypes.CREATE_TRANSACTION_SUCCESS
  payload: Transaction
}

interface CreateTransactionFailureAction {
  type: TransactionActionTypes.CREATE_TRANSACTION_FAILURE
  payload: string
}

interface UpdateTransactionRequestAction {
  type: TransactionActionTypes.UPDATE_TRANSACTION_REQUEST
}

interface UpdateTransactionSuccessAction {
  type: TransactionActionTypes.UPDATE_TRANSACTION_SUCCESS
  payload: Transaction
}

interface UpdateTransactionFailureAction {
  type: TransactionActionTypes.UPDATE_TRANSACTION_FAILURE
  payload: string
}

interface DeleteTransactionRequestAction {
  type: TransactionActionTypes.DELETE_TRANSACTION_REQUEST
}

interface DeleteTransactionSuccessAction {
  type: TransactionActionTypes.DELETE_TRANSACTION_SUCCESS
  payload: string // Transaction ID
}

interface DeleteTransactionFailureAction {
  type: TransactionActionTypes.DELETE_TRANSACTION_FAILURE
  payload: string
}

interface ReconcileTransactionAction {
  type: TransactionActionTypes.RECONCILE_TRANSACTION
  payload: string // Transaction ID
}

interface ClearTransactionErrorAction {
  type: TransactionActionTypes.CLEAR_TRANSACTION_ERROR
}

export type TransactionAction =
  | FetchTransactionsRequestAction
  | FetchTransactionsSuccessAction
  | FetchTransactionsFailureAction
  | FetchTransactionRequestAction
  | FetchTransactionSuccessAction
  | FetchTransactionFailureAction
  | CreateTransactionRequestAction
  | CreateTransactionSuccessAction
  | CreateTransactionFailureAction
  | UpdateTransactionRequestAction
  | UpdateTransactionSuccessAction
  | UpdateTransactionFailureAction
  | DeleteTransactionRequestAction
  | DeleteTransactionSuccessAction
  | DeleteTransactionFailureAction
  | ReconcileTransactionAction
  | ClearTransactionErrorAction

// Initial state
export const initialTransactionState: TransactionState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null
}

// Transaction Reducer
export const transactionReducer = (
  state: TransactionState = initialTransactionState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case TransactionActionTypes.FETCH_TRANSACTIONS_REQUEST:
    case TransactionActionTypes.FETCH_TRANSACTION_REQUEST:
    case TransactionActionTypes.CREATE_TRANSACTION_REQUEST:
    case TransactionActionTypes.UPDATE_TRANSACTION_REQUEST:
    case TransactionActionTypes.DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case TransactionActionTypes.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
        error: null
      }

    case TransactionActionTypes.FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTransaction: action.payload,
        error: null
      }

    case TransactionActionTypes.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: [...state.transactions, action.payload],
        currentTransaction: action.payload,
        error: null
      }

    case TransactionActionTypes.UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
        currentTransaction: action.payload,
        error: null
      }

    case TransactionActionTypes.DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
        currentTransaction:
          state.currentTransaction?.id === action.payload
            ? null
            : state.currentTransaction,
        error: null
      }

    case TransactionActionTypes.RECONCILE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload
            ? { ...transaction, isReconciled: true }
            : transaction
        ),
        currentTransaction:
          state.currentTransaction?.id === action.payload
            ? { ...state.currentTransaction, isReconciled: true }
            : state.currentTransaction
      }

    case TransactionActionTypes.FETCH_TRANSACTIONS_FAILURE:
    case TransactionActionTypes.FETCH_TRANSACTION_FAILURE:
    case TransactionActionTypes.CREATE_TRANSACTION_FAILURE:
    case TransactionActionTypes.UPDATE_TRANSACTION_FAILURE:
    case TransactionActionTypes.DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case TransactionActionTypes.CLEAR_TRANSACTION_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
