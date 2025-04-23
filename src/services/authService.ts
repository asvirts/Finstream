import { supabase } from "./supabase"
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

// Authenticate user with email and password
export const login = async ({
  email,
  password,
}: LoginCredentials): Promise<AuthResponse> => {
  const { data: session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error || !session) throw error
  const user = session.user as User
  return { token: session.access_token, user }
}

// Register a new user
export const register = async ({
  email,
  password,
  firstName,
  lastName,
  businessName,
}: RegisterData): Promise<AuthResponse> => {
  const { data: session, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstName, lastName, businessName } },
  })
  if (error || !session) throw error
  const user = session.user as User
  return { token: session.access_token, user }
}

// Get the current authenticated user
export const getCurrentUser = (): User | null => {
  return supabase.auth
    .getUser()
    .then(({ data: { user } }) => user as User | null)
}

// Log out the current user
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Complete the onboarding process for the user
export const completeOnboarding = async (
  data: Partial<User>
): Promise<User> => {
  const user = (await supabase.auth.getUser()).data.user
  const { data: updated, error } = await supabase
    .from<User>("users")
    .update({ ...data, isOnboarded: true })
    .eq("id", user?.id)
    .single()
  if (error || !updated) throw error
  return updated
}

// Request a password reset email
export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
  return { message: "Password reset email sent" }
}

// Reset password with token
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<{ message: string }> => {
  const { data, error } = await supabase.auth.updateUser(
    {
      password: newPassword,
    },
    { token }
  )
  if (error) throw error
  return { message: "Password has been reset" }
}

// Change the current user's password
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  // Supabase does not verify current password; rely on session
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
  return { message: "Password changed" }
}

// Update the current user's profile
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const { data: updated, error } = await supabase.auth.updateUser({
    data: { ...data },
  })
  if (error || !updated.user) throw error
  return updated.user as User
}
