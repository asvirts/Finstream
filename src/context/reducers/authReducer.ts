import { AuthState, User } from "../../types"

// Auth Action Types
export enum AuthActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
  LOGOUT = "LOGOUT",
  LOAD_USER = "LOAD_USER",
  COMPLETE_ONBOARDING = "COMPLETE_ONBOARDING",
  AUTH_ERROR = "AUTH_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR"
}

// Auth Actions
interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS
  payload: {
    token: string
    user: User
  }
}

interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE
  payload: string
}

interface RegisterRequestAction {
  type: AuthActionTypes.REGISTER_REQUEST
}

interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS
  payload: {
    token: string
    user: User
  }
}

interface RegisterFailureAction {
  type: AuthActionTypes.REGISTER_FAILURE
  payload: string
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT
}

interface LoadUserAction {
  type: AuthActionTypes.LOAD_USER
  payload: User
}

interface CompleteOnboardingAction {
  type: AuthActionTypes.COMPLETE_ONBOARDING
}

interface AuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR
  payload: string
}

interface ClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutAction
  | LoadUserAction
  | CompleteOnboardingAction
  | AuthErrorAction
  | ClearErrorAction

// Initial state
export const initialAuthState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

// Auth Reducer
export const authReducer = (
  state: AuthState = initialAuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      }
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        error: action.payload
      }
    case AuthActionTypes.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false
      }
    case AuthActionTypes.COMPLETE_ONBOARDING:
      return {
        ...state,
        user: state.user ? { ...state.user, isOnboarded: true } : null
      }
    case AuthActionTypes.LOGOUT:
      return initialAuthState
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
