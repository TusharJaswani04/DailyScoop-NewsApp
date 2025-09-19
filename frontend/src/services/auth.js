
import axios from 'axios'

// Authentication API functions
export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login/', credentials)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed')
  }
}

export const signup = async (userData) => {
  try {
    const response = await axios.post('/api/auth/signup/', userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Signup failed')
  }
}

export const logout = async () => {
  try {
    const response = await axios.post('/api/auth/logout/')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Logout failed')
  }
}

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get('/api/auth/status/')
    return response.data.user
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null // User is not authenticated
    }
    throw new Error('Not authenticated')
  }
}

export const getUserProfile = async () => {
  try {
    const response = await axios.get('/api/auth/profile/')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch profile')
  }
}

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put('/api/auth/profile/', profileData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update profile')
  }
}
