import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

// Add CSRF token to requests
const getCookie = (name) => {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

axios.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken')
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken
  }
  return config
})

// News API functions
export const getNews = async (params = {}) => {
  try {
    const response = await axios.get('/api/news/', { params })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch news')
  }
}

export const getNewsByCategory = async (category, params = {}) => {
  try {
    const response = await axios.get(`/api/news/category/${category}/`, { params })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch category news')
  }
}

export const getPersonalizedNews = async (params = {}) => {
  try {
    const response = await axios.get('/api/news/for-you/', { params })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch personalized news')
  }
}

export const getArticleDetail = async (articleId) => {
  try {
    const response = await axios.get(`/api/news/${articleId}/`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch article details')
  }
}

export const searchNews = async (query, params = {}) => {
  try {
    const response = await axios.get('/api/news/search/', { 
      params: { q: query, ...params } 
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Search failed')
  }
}

export const refreshNews = async () => {
  try {
    const response = await axios.post('/api/refresh-news/')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to refresh news')
  }
}
