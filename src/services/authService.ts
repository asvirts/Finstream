import { apiPost, apiGet, setAuthToken, clearAuthToken } from "./api"
import { User } from "../types"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  businessName?: string
}

interface AuthResponse {
  token: string
  user: User
}

/**
 * Authenticate user with email and password
 */
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await apiPost<AuthResponse>("/auth/login", credentials)

    // Store the token
    await setAuthToken(response.token)

    return response
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiPost<AuthResponse>("/auth/register", data)

    // Store the token
    await setAuthToken(response.token)

    return response
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    return await apiGet<User>("/auth/me")
  } catch (error) {
    console.error("Get current user error:", error)
    throw error
  }
}

/**
 * Log out the current user
 */
export const logout = async (): Promise<void> => {
  try {
    // Make an API call to invalidate the token on the server (optional)
    await apiPost("/auth/logout")
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    // Clear the token from storage
    await clearAuthToken()
  }
}

/**
 * Complete the onboarding process for the user
 */
export const completeOnboarding = async (data: any): Promise<User> => {
  try {
    return await apiPost<User>("/auth/onboarding", data)
  } catch (error) {
    console.error("Complete onboarding error:", error)
    throw error
  }
}

/**
 * Request a password reset email
 */
export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  try {
    return await apiPost<{ message: string }>("/auth/forgot-password", {
      email
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    throw error
  }
}

/**
 * Reset password with token
 */
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    return await apiPost<{ message: string }>("/auth/reset-password", {
      token,
      newPassword
    })
  } catch (error) {
    console.error("Reset password error:", error)
    throw error
  }
}

/**
 * Change the current user's password
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    return await apiPost<{ message: string }>("/auth/change-password", {
      currentPassword,
      newPassword
    })
  } catch (error) {
    console.error("Change password error:", error)
    throw error
  }
}

/**
 * Update the current user's profile
 */
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  try {
    return await apiPost<User>("/auth/profile", data)
  } catch (error) {
    console.error("Update profile error:", error)
    throw error
  }
}
