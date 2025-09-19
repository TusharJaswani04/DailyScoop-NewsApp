import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NewsList from '../components/NewsList'
import { getPersonalizedNews } from '../services/api'
import { getUserProfile } from '../services/auth'

const ForYou = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [showPreferencesPrompt, setShowPreferencesPrompt] = useState(false)

  useEffect(() => {
    fetchPersonalizedNews()
    checkUserPreferences()
  }, [])

  const fetchPersonalizedNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPersonalizedNews()
      setArticles(data.results || data)
    } catch (err) {
      setError('Failed to load personalized news. Please try again later.')
      console.error('Error fetching personalized news:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkUserPreferences = async () => {
    try {
      const profileData = await getUserProfile()
      setProfile(profileData)
      
      // Show preferences prompt if user hasn't set any preferences
      if (!profileData.preferred_categories || profileData.preferred_categories.length === 0) {
        setShowPreferencesPrompt(true)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }

  return (
    <div className="container-fluid px-0">
      {/* For You Header */}
      <div className="bg-gradient text-white py-4 mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="display-5 fw-bold mb-2">
                <i className="fas fa-heart text-danger me-3"></i>
                For You
              </h1>
              <p className="lead mb-0">
                Personalized news based on your interests and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Prompt */}
      {showPreferencesPrompt && (
        <div className="container mb-4">
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <div className="d-flex align-items-center">
              <i className="fas fa-info-circle fs-4 me-3"></i>
              <div className="flex-grow-1">
                <h6 className="alert-heading mb-1">Personalize Your Feed</h6>
                <p className="mb-2">
                  Help us customize your news feed by setting your preferences!
                </p>
                <Link to="/profile" className="btn btn-primary btn-sm">
                  Set Preferences
                </Link>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowPreferencesPrompt(false)}
            ></button>
          </div>
        </div>
      )}

      {/* User Preferences Display */}
      {profile && (profile.preferred_categories?.length > 0 || profile.preferred_sources?.length > 0) && (
        <div className="container mb-4">
          <div className="card bg-light">
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-filter me-2"></i>
                Your Preferences
              </h6>
              <div className="row">
                {profile.preferred_categories?.length > 0 && (
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Categories:</small>
                    {profile.preferred_categories.map(cat => (
                      <span key={cat} className="badge bg-primary me-1 mb-1">{cat}</span>
                    ))}
                  </div>
                )}
                {profile.preferred_sources?.length > 0 && (
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Sources:</small>
                    {profile.preferred_sources.map(source => (
                      <span key={source} className="badge bg-secondary me-1 mb-1">{source}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <NewsList 
        articles={articles}
        loading={loading}
        error={error}
        title="Your Personalized News"
        onRefresh={fetchPersonalizedNews}
      />
    </div>
  )
}

export default ForYou