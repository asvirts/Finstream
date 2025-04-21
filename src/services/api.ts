import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define the base URL for API calls
// In a real application, you would use environment variables
const API_BASE_URL = "https://api.finstreamapp.com/v1"
const AUTH_TOKEN_KEY = "auth_token"

// Create a custom Axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 30000 // 30 seconds
})

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response } = error

    // Handle 401 Unauthorized errors (token expired)
    if (response && response.status === 401) {
      // Clear the stored token
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY)

      // You could trigger a logout action here
      // dispatch({ type: 'LOGOUT' });
    }

    return Promise.reject(error)
  }
)

// Helper functions for API requests
export const apiGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

export const apiPost = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data, config)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

export const apiPut = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data, config)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

export const apiPatch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.patch(url, data, config)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

export const apiDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url, config)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

// Helper function to standardize error handling
const handleApiError = (error: any): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      // The request was made and the server responded with an error status
      console.error("API Error Response:", axiosError.response.data)
      console.error("Status:", axiosError.response.status)
      console.error("Headers:", axiosError.response.headers)
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("API Error Request:", axiosError.request)
    } else {
      // Something happened in setting up the request
      console.error("API Error Message:", axiosError.message)
    }
  } else {
    // Non-Axios error
    console.error("Unexpected API Error:", error)
  }
}

// Helper to set auth token
export const setAuthToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
}

// Helper to clear auth token
export const clearAuthToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
}

// Helper to get auth token
export const getAuthToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(AUTH_TOKEN_KEY)
}

export default api
