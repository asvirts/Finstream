import Constants from "expo-constants"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY"
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
