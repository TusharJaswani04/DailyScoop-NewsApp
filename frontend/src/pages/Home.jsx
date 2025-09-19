import React, { useState, useEffect } from 'react'
import NewsList from '../components/NewsList'
import SearchBar from '../components/SearchBar'
import { getNews, refreshNews } from '../services/api'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getNews({ page: 1 })
      setArticles(data.results || data)
    } catch (err) {
      setError('Failed to load news. Please try again later.')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setLoading(true)
      await refreshNews()
      await fetchNews()
    } catch (err) {
      setError('Failed to refresh news. Please try again.')
      console.error('Error refreshing news:', err)
    }
  }

  const handleSearch = async (query) => {
    try {
      setLoading(true)
      setError(null)
      setSearchQuery(query)
      
      if (query.trim()) {
        const data = await getNews({ search: query, page: 1 })
        setArticles(data.results || data)
      } else {
        await fetchNews()
      }
    } catch (err) {
      setError('Search failed. Please try again.')
      console.error('Error searching news:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-2">
                Stay Informed with DailyScoop
              </h1>
              <p className="lead mb-0">
                Your trusted source for the latest news from India and around the world
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <i className="fas fa-globe display-1 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* News Section */}
      <NewsList 
        initialArticles={articles}
        loading={loading}
        error={error}
        title={searchQuery ? `Search Results for "${searchQuery}"` : "Latest News"}
        onRefresh={handleRefresh}
        apiEndpoint="http://localhost:8000/api/news/"
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default Home
