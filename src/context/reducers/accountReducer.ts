import { Account } from "../../types"

// Account State Interface
export interface AccountState {
  accounts: Account[]
  currentAccount: Account | null
  loading: boolean
  error: string | null
}

// Account Action Types
export enum AccountActionTypes {
  FETCH_ACCOUNTS_REQUEST = "FETCH_ACCOUNTS_REQUEST",
  FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS",
  FETCH_ACCOUNTS_FAILURE = "FETCH_ACCOUNTS_FAILURE",
  FETCH_ACCOUNT_REQUEST = "FETCH_ACCOUNT_REQUEST",
  FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS",
  FETCH_ACCOUNT_FAILURE = "FETCH_ACCOUNT_FAILURE",
  CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST",
  CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS",
  CREATE_ACCOUNT_FAILURE = "CREATE_ACCOUNT_FAILURE",
  UPDATE_ACCOUNT_REQUEST = "UPDATE_ACCOUNT_REQUEST",
  UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS",
  UPDATE_ACCOUNT_FAILURE = "UPDATE_ACCOUNT_FAILURE",
  DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST",
  DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS",
  DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE",
  ARCHIVE_ACCOUNT = "ARCHIVE_ACCOUNT",
  CLEAR_ACCOUNT_ERROR = "CLEAR_ACCOUNT_ERROR"
}

// Account Actions
interface FetchAccountsRequestAction {
  type: AccountActionTypes.FETCH_ACCOUNTS_REQUEST
}

interface FetchAccountsSuccessAction {
  type: AccountActionTypes.FETCH_ACCOUNTS_SUCCESS
  payload: Account[]
}

interface FetchAccountsFailureAction {
  type: AccountActionTypes.FETCH_ACCOUNTS_FAILURE
  payload: string
}

interface FetchAccountRequestAction {
  type: AccountActionTypes.FETCH_ACCOUNT_REQUEST
}

interface FetchAccountSuccessAction {
  type: AccountActionTypes.FETCH_ACCOUNT_SUCCESS
  payload: Account
}

interface FetchAccountFailureAction {
  type: AccountActionTypes.FETCH_ACCOUNT_FAILURE
  payload: string
}

interface CreateAccountRequestAction {
  type: AccountActionTypes.CREATE_ACCOUNT_REQUEST
}

interface CreateAccountSuccessAction {
  type: AccountActionTypes.CREATE_ACCOUNT_SUCCESS
  payload: Account
}

interface CreateAccountFailureAction {
  type: AccountActionTypes.CREATE_ACCOUNT_FAILURE
  payload: string
}

interface UpdateAccountRequestAction {
  type: AccountActionTypes.UPDATE_ACCOUNT_REQUEST
}

interface UpdateAccountSuccessAction {
  type: AccountActionTypes.UPDATE_ACCOUNT_SUCCESS
  payload: Account
}

interface UpdateAccountFailureAction {
  type: AccountActionTypes.UPDATE_ACCOUNT_FAILURE
  payload: string
}

interface DeleteAccountRequestAction {
  type: AccountActionTypes.DELETE_ACCOUNT_REQUEST
}

interface DeleteAccountSuccessAction {
  type: AccountActionTypes.DELETE_ACCOUNT_SUCCESS
  payload: string // Account ID
}

interface DeleteAccountFailureAction {
  type: AccountActionTypes.DELETE_ACCOUNT_FAILURE
  payload: string
}

interface ArchiveAccountAction {
  type: AccountActionTypes.ARCHIVE_ACCOUNT
  payload: string // Account ID
}

interface ClearAccountErrorAction {
  type: AccountActionTypes.CLEAR_ACCOUNT_ERROR
}

export type AccountAction =
  | FetchAccountsRequestAction
  | FetchAccountsSuccessAction
  | FetchAccountsFailureAction
  | FetchAccountRequestAction
  | FetchAccountSuccessAction
  | FetchAccountFailureAction
  | CreateAccountRequestAction
  | CreateAccountSuccessAction
  | CreateAccountFailureAction
  | UpdateAccountRequestAction
  | UpdateAccountSuccessAction
  | UpdateAccountFailureAction
  | DeleteAccountRequestAction
  | DeleteAccountSuccessAction
  | DeleteAccountFailureAction
  | ArchiveAccountAction
  | ClearAccountErrorAction

// Initial state
export const initialAccountState: AccountState = {
  accounts: [],
  currentAccount: null,
  loading: false,
  error: null
}

// Account Reducer
export const accountReducer = (
  state: AccountState = initialAccountState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case AccountActionTypes.FETCH_ACCOUNTS_REQUEST:
    case AccountActionTypes.FETCH_ACCOUNT_REQUEST:
    case AccountActionTypes.CREATE_ACCOUNT_REQUEST:
    case AccountActionTypes.UPDATE_ACCOUNT_REQUEST:
    case AccountActionTypes.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case AccountActionTypes.FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
        error: null
      }

    case AccountActionTypes.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAccount: action.payload,
        error: null
      }

    case AccountActionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: [...state.accounts, action.payload],
        currentAccount: action.payload,
        error: null
      }

    case AccountActionTypes.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id ? action.payload : account
        ),
        currentAccount: action.payload,
        error: null
      }

    case AccountActionTypes.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: state.accounts.filter(
          (account) => account.id !== action.payload
        ),
        currentAccount:
          state.currentAccount?.id === action.payload
            ? null
            : state.currentAccount,
        error: null
      }

    case AccountActionTypes.ARCHIVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload
            ? { ...account, isArchived: true }
            : account
        ),
        currentAccount:
          state.currentAccount?.id === action.payload
            ? { ...state.currentAccount, isArchived: true }
            : state.currentAccount
      }

    case AccountActionTypes.FETCH_ACCOUNTS_FAILURE:
    case AccountActionTypes.FETCH_ACCOUNT_FAILURE:
    case AccountActionTypes.CREATE_ACCOUNT_FAILURE:
    case AccountActionTypes.UPDATE_ACCOUNT_FAILURE:
    case AccountActionTypes.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case AccountActionTypes.CLEAR_ACCOUNT_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
