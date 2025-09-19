import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NewsList from '../components/NewsList'
import { getNewsByCategory } from '../services/api'

const Category = () => {
  const { categoryName } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategoryNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName])

  const fetchCategoryNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getNewsByCategory(categoryName)
      setArticles(data.results || data)
    } catch (err) {
      setError(`Failed to load ${categoryName} news. Please try again later.`)
      console.error('Error fetching category news:', err)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Technology': 'fas fa-microchip',
      'Sports': 'fas fa-futbol',
      'Business': 'fas fa-chart-line',
      'Entertainment': 'fas fa-film',
      'Health': 'fas fa-heartbeat',
      'Politics': 'fas fa-landmark',
      'World': 'fas fa-globe',
      'India': 'fas fa-flag'
    }
    return icons[category] || 'fas fa-newspaper'
  }

  return (
    <div className="container-fluid px-0">
      {/* Category Header */}
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="display-5 fw-bold mb-2">
                <i className={`${getCategoryIcon(categoryName)} me-3`}></i>
                {categoryName} News
              </h1>
              <p className="lead mb-0">
                Latest updates and breaking news in {categoryName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <NewsList 
        initialArticles={articles}
        loading={loading}
        error={error}
        title={`${categoryName} News`}
        onRefresh={fetchCategoryNews}
        apiEndpoint={`http://localhost:8000/api/news/category/${categoryName}/`}
        category={categoryName}
      />
    </div>
  )
}

export default Category
