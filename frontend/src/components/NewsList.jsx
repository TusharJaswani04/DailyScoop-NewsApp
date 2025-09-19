import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import NewsCard from './NewsCard'

const NewsList = ({ 
  initialArticles = [], 
  loading, 
  error, 
  title, 
  showRefresh = true, 
  onRefresh,
  apiEndpoint,
  searchQuery = '',
  category = ''
}) => {
  const [articles, setArticles] = useState(initialArticles)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Reset when props change
  useEffect(() => {
    setArticles(initialArticles)
    setPage(1)
    setHasMore(initialArticles.length >= 20) // Assuming 20 per page
  }, [initialArticles, searchQuery, category])

  const fetchMoreArticles = async () => {
    if (isLoadingMore || !apiEndpoint) return
    
    setIsLoadingMore(true)
    
    try {
      const response = await fetch(
        `${apiEndpoint}?page=${page + 1}${searchQuery ? `&search=${searchQuery}` : ''}${category ? `&category=${category}` : ''}`
      )
      
      const data = await response.json()
      const newArticles = data.results || []
      
      setArticles(prev => [...prev, ...newArticles])
      setPage(prev => prev + 1)
      setHasMore(Boolean(data.next))
    } catch (err) {
      console.error('Error fetching more articles:', err)
      setHasMore(false)
    } finally {
      setIsLoadingMore(false)
    }
  }

  if (loading && articles.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading latest news...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
        {showRefresh && onRefresh && (
          <div className="mt-2">
            <button className="btn btn-outline-danger" onClick={onRefresh}>
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-newspaper fs-1 text-muted mb-3"></i>
        <h4>No articles found</h4>
        <p className="text-muted">Try refreshing or check back later for the latest news.</p>
        {showRefresh && onRefresh && (
          <button className="btn btn-primary" onClick={onRefresh}>
            <i className="fas fa-refresh me-2"></i>
            Refresh News
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {title && (
          <h2 className="mb-0">
            {title}
            <span className="badge bg-secondary ms-2">{articles.length}</span>
          </h2>
        )}
        {showRefresh && onRefresh && (
          <button className="btn btn-outline-primary" onClick={onRefresh}>
            <i className="fas fa-sync-alt me-2"></i>
            Refresh
          </button>
        )}
      </div>
      
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreArticles}
        hasMore={hasMore}
        loader={
          <div className="text-center py-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading more...</span>
            </div>
            <p className="mt-2">Loading more articles...</p>
          </div>
        }
        endMessage={
          <div className="text-center py-4">
            <p className="text-muted mb-0">
              <i className="fas fa-check-circle me-2"></i>
              You've seen all the latest news!
            </p>
          </div>
        }
        refreshFunction={onRefresh}
        pullDownToRefresh={true}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>↓ Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>↑ Release to refresh</h3>
        }
      >
        <div className="row g-4">
          {articles.map((article, index) => (
            <div className="col-lg-4 col-md-6" key={`${article.id || article.link}-${index}`}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default NewsList
