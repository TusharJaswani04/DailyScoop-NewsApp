
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ShareButton from '../components/ShareButton'
import { getArticleDetail } from '../services/api'

const ArticleDetail = () => {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showGeminiSummary, setShowGeminiSummary] = useState(false)

  useEffect(() => {
    fetchArticleDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId])

  const fetchArticleDetail = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getArticleDetail(articleId)
      setArticle(data)
    } catch (err) {
      setError('Failed to load article. Please try again later.')
      console.error('Error fetching article:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error || 'Article not found'}
        </div>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <article className="card shadow-sm">
            {article.image_url && (
              <img 
                src={article.image_url} 
                className="card-img-top article-image" 
                alt={article.title}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            )}

            <div className="card-body p-4">
              {/* Article Meta */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="badge bg-primary fs-6">
                  {article.category}
                </span>
                <ShareButton article={article} />
              </div>

              {/* Article Title */}
              <h1 className="card-title display-6 fw-bold mb-3">
                {article.title}
              </h1>

              {/* Article Info */}
              <div className="row mb-4 text-muted">
                <div className="col-md-6">
                  <i className="fas fa-building me-2"></i>
                  <strong>Source:</strong> {article.source}
                </div>
                <div className="col-md-6">
                  <i className="fas fa-clock me-2"></i>
                  <strong>Published:</strong> {formatDate(article.published || article.created_at)}
                </div>
                {article.author && (
                  <div className="col-md-6 mt-2">
                    <i className="fas fa-user me-2"></i>
                    <strong>Author:</strong> {article.author}
                  </div>
                )}
              </div>

              {/* AI Summary */}
              {article.gemini_summary && (
                <div className="card bg-light mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      <i className="fas fa-robot me-2 text-primary"></i>
                      AI Summary
                    </h6>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setShowGeminiSummary(!showGeminiSummary)}
                    >
                      {showGeminiSummary ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showGeminiSummary && (
                    <div className="card-body">
                      <p className="mb-0 fst-italic">
                        {article.gemini_summary}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Article Content */}
              <div className="article-content">
                <p className="lead mb-4">
                  {article.summary}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-4">
                    <h6>Tags:</h6>
                    {article.tags.map(tag => (
                      <span key={tag} className="badge bg-secondary me-2 mb-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read Original Article */}
                <div className="text-center py-4">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-lg"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Read Full Article on {article.source}
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className="text-center mt-4">
            <Link to="/" className="btn btn-outline-primary">
              <i className="fas fa-arrow-left me-2"></i>
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
