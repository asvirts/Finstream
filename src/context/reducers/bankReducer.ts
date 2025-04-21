import { BankAccount, BankTransaction } from "../../types"

// Bank State Interface
export interface BankState {
  bankAccounts: BankAccount[]
  currentBankAccount: BankAccount | null
  bankTransactions: BankTransaction[]
  loading: boolean
  plaidLinkToken: string | null
  error: string | null
}

// Bank Action Types
export enum BankActionTypes {
  FETCH_BANK_ACCOUNTS_REQUEST = "FETCH_BANK_ACCOUNTS_REQUEST",
  FETCH_BANK_ACCOUNTS_SUCCESS = "FETCH_BANK_ACCOUNTS_SUCCESS",
  FETCH_BANK_ACCOUNTS_FAILURE = "FETCH_BANK_ACCOUNTS_FAILURE",
  FETCH_BANK_ACCOUNT_REQUEST = "FETCH_BANK_ACCOUNT_REQUEST",
  FETCH_BANK_ACCOUNT_SUCCESS = "FETCH_BANK_ACCOUNT_SUCCESS",
  FETCH_BANK_ACCOUNT_FAILURE = "FETCH_BANK_ACCOUNT_FAILURE",
  LINK_BANK_ACCOUNT_REQUEST = "LINK_BANK_ACCOUNT_REQUEST",
  LINK_BANK_ACCOUNT_SUCCESS = "LINK_BANK_ACCOUNT_SUCCESS",
  LINK_BANK_ACCOUNT_FAILURE = "LINK_BANK_ACCOUNT_FAILURE",
  DELETE_BANK_ACCOUNT_REQUEST = "DELETE_BANK_ACCOUNT_REQUEST",
  DELETE_BANK_ACCOUNT_SUCCESS = "DELETE_BANK_ACCOUNT_SUCCESS",
  DELETE_BANK_ACCOUNT_FAILURE = "DELETE_BANK_ACCOUNT_FAILURE",
  FETCH_BANK_TRANSACTIONS_REQUEST = "FETCH_BANK_TRANSACTIONS_REQUEST",
  FETCH_BANK_TRANSACTIONS_SUCCESS = "FETCH_BANK_TRANSACTIONS_SUCCESS",
  FETCH_BANK_TRANSACTIONS_FAILURE = "FETCH_BANK_TRANSACTIONS_FAILURE",
  MATCH_TRANSACTION_REQUEST = "MATCH_TRANSACTION_REQUEST",
  MATCH_TRANSACTION_SUCCESS = "MATCH_TRANSACTION_SUCCESS",
  MATCH_TRANSACTION_FAILURE = "MATCH_TRANSACTION_FAILURE",
  UNMATCH_TRANSACTION = "UNMATCH_TRANSACTION",
  CREATE_PLAID_LINK_TOKEN_REQUEST = "CREATE_PLAID_LINK_TOKEN_REQUEST",
  CREATE_PLAID_LINK_TOKEN_SUCCESS = "CREATE_PLAID_LINK_TOKEN_SUCCESS",
  CREATE_PLAID_LINK_TOKEN_FAILURE = "CREATE_PLAID_LINK_TOKEN_FAILURE",
  CLEAR_PLAID_LINK_TOKEN = "CLEAR_PLAID_LINK_TOKEN",
  SYNC_BANK_DATA_REQUEST = "SYNC_BANK_DATA_REQUEST",
  SYNC_BANK_DATA_SUCCESS = "SYNC_BANK_DATA_SUCCESS",
  SYNC_BANK_DATA_FAILURE = "SYNC_BANK_DATA_FAILURE",
  CLEAR_BANK_ERROR = "CLEAR_BANK_ERROR"
}

// Bank Actions
interface FetchBankAccountsRequestAction {
  type: BankActionTypes.FETCH_BANK_ACCOUNTS_REQUEST
}

interface FetchBankAccountsSuccessAction {
  type: BankActionTypes.FETCH_BANK_ACCOUNTS_SUCCESS
  payload: BankAccount[]
}

interface FetchBankAccountsFailureAction {
  type: BankActionTypes.FETCH_BANK_ACCOUNTS_FAILURE
  payload: string
}

interface FetchBankAccountRequestAction {
  type: BankActionTypes.FETCH_BANK_ACCOUNT_REQUEST
}

interface FetchBankAccountSuccessAction {
  type: BankActionTypes.FETCH_BANK_ACCOUNT_SUCCESS
  payload: BankAccount
}

interface FetchBankAccountFailureAction {
  type: BankActionTypes.FETCH_BANK_ACCOUNT_FAILURE
  payload: string
}

interface LinkBankAccountRequestAction {
  type: BankActionTypes.LINK_BANK_ACCOUNT_REQUEST
}

interface LinkBankAccountSuccessAction {
  type: BankActionTypes.LINK_BANK_ACCOUNT_SUCCESS
  payload: BankAccount
}

interface LinkBankAccountFailureAction {
  type: BankActionTypes.LINK_BANK_ACCOUNT_FAILURE
  payload: string
}

interface DeleteBankAccountRequestAction {
  type: BankActionTypes.DELETE_BANK_ACCOUNT_REQUEST
}

interface DeleteBankAccountSuccessAction {
  type: BankActionTypes.DELETE_BANK_ACCOUNT_SUCCESS
  payload: string // Bank Account ID
}

interface DeleteBankAccountFailureAction {
  type: BankActionTypes.DELETE_BANK_ACCOUNT_FAILURE
  payload: string
}

interface FetchBankTransactionsRequestAction {
  type: BankActionTypes.FETCH_BANK_TRANSACTIONS_REQUEST
}

interface FetchBankTransactionsSuccessAction {
  type: BankActionTypes.FETCH_BANK_TRANSACTIONS_SUCCESS
  payload: BankTransaction[]
}

interface FetchBankTransactionsFailureAction {
  type: BankActionTypes.FETCH_BANK_TRANSACTIONS_FAILURE
  payload: string
}

interface MatchTransactionRequestAction {
  type: BankActionTypes.MATCH_TRANSACTION_REQUEST
}

interface MatchTransactionSuccessAction {
  type: BankActionTypes.MATCH_TRANSACTION_SUCCESS
  payload: {
    bankTransactionId: string
    transactionId: string
  }
}

interface MatchTransactionFailureAction {
  type: BankActionTypes.MATCH_TRANSACTION_FAILURE
  payload: string
}

interface UnmatchTransactionAction {
  type: BankActionTypes.UNMATCH_TRANSACTION
  payload: string // Bank Transaction ID
}

interface CreatePlaidLinkTokenRequestAction {
  type: BankActionTypes.CREATE_PLAID_LINK_TOKEN_REQUEST
}

interface CreatePlaidLinkTokenSuccessAction {
  type: BankActionTypes.CREATE_PLAID_LINK_TOKEN_SUCCESS
  payload: string // Link Token
}

interface CreatePlaidLinkTokenFailureAction {
  type: BankActionTypes.CREATE_PLAID_LINK_TOKEN_FAILURE
  payload: string
}

interface ClearPlaidLinkTokenAction {
  type: BankActionTypes.CLEAR_PLAID_LINK_TOKEN
}

interface SyncBankDataRequestAction {
  type: BankActionTypes.SYNC_BANK_DATA_REQUEST
}

interface SyncBankDataSuccessAction {
  type: BankActionTypes.SYNC_BANK_DATA_SUCCESS
  payload: {
    bankAccount: BankAccount
    transactions: BankTransaction[]
  }
}

interface SyncBankDataFailureAction {
  type: BankActionTypes.SYNC_BANK_DATA_FAILURE
  payload: string
}

interface ClearBankErrorAction {
  type: BankActionTypes.CLEAR_BANK_ERROR
}

export type BankAction =
  | FetchBankAccountsRequestAction
  | FetchBankAccountsSuccessAction
  | FetchBankAccountsFailureAction
  | FetchBankAccountRequestAction
  | FetchBankAccountSuccessAction
  | FetchBankAccountFailureAction
  | LinkBankAccountRequestAction
  | LinkBankAccountSuccessAction
  | LinkBankAccountFailureAction
  | DeleteBankAccountRequestAction
  | DeleteBankAccountSuccessAction
  | DeleteBankAccountFailureAction
  | FetchBankTransactionsRequestAction
  | FetchBankTransactionsSuccessAction
  | FetchBankTransactionsFailureAction
  | MatchTransactionRequestAction
  | MatchTransactionSuccessAction
  | MatchTransactionFailureAction
  | UnmatchTransactionAction
  | CreatePlaidLinkTokenRequestAction
  | CreatePlaidLinkTokenSuccessAction
  | CreatePlaidLinkTokenFailureAction
  | ClearPlaidLinkTokenAction
  | SyncBankDataRequestAction
  | SyncBankDataSuccessAction
  | SyncBankDataFailureAction
  | ClearBankErrorAction

// Initial state
export const initialBankState: BankState = {
  bankAccounts: [],
  currentBankAccount: null,
  bankTransactions: [],
  loading: false,
  plaidLinkToken: null,
  error: null
}

// Bank Reducer
export const bankReducer = (
  state: BankState = initialBankState,
  action: BankAction
): BankState => {
  switch (action.type) {
    case BankActionTypes.FETCH_BANK_ACCOUNTS_REQUEST:
    case BankActionTypes.FETCH_BANK_ACCOUNT_REQUEST:
    case BankActionTypes.LINK_BANK_ACCOUNT_REQUEST:
    case BankActionTypes.DELETE_BANK_ACCOUNT_REQUEST:
    case BankActionTypes.FETCH_BANK_TRANSACTIONS_REQUEST:
    case BankActionTypes.MATCH_TRANSACTION_REQUEST:
    case BankActionTypes.CREATE_PLAID_LINK_TOKEN_REQUEST:
    case BankActionTypes.SYNC_BANK_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case BankActionTypes.FETCH_BANK_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAccounts: action.payload,
        error: null
      }

    case BankActionTypes.FETCH_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBankAccount: action.payload,
        error: null
      }

    case BankActionTypes.LINK_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAccounts: [...state.bankAccounts, action.payload],
        currentBankAccount: action.payload,
        error: null
      }

    case BankActionTypes.DELETE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAccounts: state.bankAccounts.filter(
          (account) => account.id !== action.payload
        ),
        currentBankAccount:
          state.currentBankAccount?.id === action.payload
            ? null
            : state.currentBankAccount,
        error: null
      }

    case BankActionTypes.FETCH_BANK_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        bankTransactions: action.payload,
        error: null
      }

    case BankActionTypes.MATCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        bankTransactions: state.bankTransactions.map((transaction) =>
          transaction.id === action.payload.bankTransactionId
            ? {
                ...transaction,
                transactionId: action.payload.transactionId,
                isMatched: true
              }
            : transaction
        ),
        error: null
      }

    case BankActionTypes.UNMATCH_TRANSACTION:
      return {
        ...state,
        bankTransactions: state.bankTransactions.map((transaction) =>
          transaction.id === action.payload
            ? { ...transaction, transactionId: undefined, isMatched: false }
            : transaction
        )
      }

    case BankActionTypes.CREATE_PLAID_LINK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        plaidLinkToken: action.payload,
        error: null
      }

    case BankActionTypes.CLEAR_PLAID_LINK_TOKEN:
      return {
        ...state,
        plaidLinkToken: null
      }

    case BankActionTypes.SYNC_BANK_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAccounts: state.bankAccounts.map((account) =>
          account.id === action.payload.bankAccount.id
            ? action.payload.bankAccount
            : account
        ),
        currentBankAccount:
          state.currentBankAccount?.id === action.payload.bankAccount.id
            ? action.payload.bankAccount
            : state.currentBankAccount,
        bankTransactions: [
          ...state.bankTransactions.filter(
            (transaction) =>
              transaction.bankAccountId !== action.payload.bankAccount.id
          ),
          ...action.payload.transactions
        ],
        error: null
      }

    case BankActionTypes.FETCH_BANK_ACCOUNTS_FAILURE:
    case BankActionTypes.FETCH_BANK_ACCOUNT_FAILURE:
    case BankActionTypes.LINK_BANK_ACCOUNT_FAILURE:
    case BankActionTypes.DELETE_BANK_ACCOUNT_FAILURE:
    case BankActionTypes.FETCH_BANK_TRANSACTIONS_FAILURE:
    case BankActionTypes.MATCH_TRANSACTION_FAILURE:
    case BankActionTypes.CREATE_PLAID_LINK_TOKEN_FAILURE:
    case BankActionTypes.SYNC_BANK_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case BankActionTypes.CLEAR_BANK_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
