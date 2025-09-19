import React from 'react'
import { Link } from 'react-router-dom'
import ShareButton from './ShareButton'

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateText = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="card h-100 shadow-sm news-card">
      {article.image_url && (
        <img 
          src={article.image_url} 
          className="card-img-top news-image" 
          alt={article.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200/6c757d/ffffff?text=No+Image'
          }}
        />
      )}
      
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-primary text-truncate category-badge">
            {article.category}
          </span>
          <small className="text-muted">{article.source}</small>
        </div>
        
        <h5 className="card-title mb-2">
          <Link 
            to={`/article/${article.id}`} 
            className="text-decoration-none text-dark"
          >
            {truncateText(article.title, 80)}
          </Link>
        </h5>
        
        <p className="card-text text-muted flex-grow-1">
          {truncateText(article.summary, 120)}
        </p>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              <i className="fas fa-clock me-1"></i>
              {formatDate(article.published || article.created_at)}
            </small>
            {article.author && (
              <small className="text-muted">
                <i className="fas fa-user me-1"></i>
                {truncateText(article.author, 20)}
              </small>
            )}
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <Link 
              to={`/article/${article.id}`} 
              className="btn btn-primary btn-sm"
            >
              Read More
              <i className="fas fa-arrow-right ms-1"></i>
            </Link>
            
            <ShareButton article={article} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard