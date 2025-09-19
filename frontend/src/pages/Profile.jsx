import React, { useState, useEffect } from 'react'
import { getUserProfile, updateUserProfile } from '../services/auth'

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const availableCategories = ['India', 'Technology', 'Sports', 'Business', 'Entertainment', 'World', 'Politics', 'Health']
  const availableSources = ['Times of India', 'NDTV', 'Indian Express', 'Hindustan Times', 'News18', 'Zee News']

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await getUserProfile()
      setProfile(data)
    } catch (err) {
      setError('Failed to load profile')
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category) => {
    const updatedCategories = profile.preferred_categories.includes(category)
      ? profile.preferred_categories.filter(cat => cat !== category)
      : [...profile.preferred_categories, category]
    
    setProfile({
      ...profile,
      preferred_categories: updatedCategories
    })
  }

  const handleSourceChange = (source) => {
    const updatedSources = profile.preferred_sources.includes(source)
      ? profile.preferred_sources.filter(src => src !== source)
      : [...profile.preferred_sources, source]
    
    setProfile({
      ...profile,
      preferred_sources: updatedSources
    })
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      
      await updateUserProfile({
        preferred_categories: profile.preferred_categories,
        preferred_sources: profile.preferred_sources
      })
      
      setSuccess('Preferences saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-user-cog me-2"></i>
                Profile Settings
              </h3>
            </div>
            
            <div className="card-body p-4">
              {/* User Info */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6>Username</h6>
                  <p className="text-muted">{user.username}</p>
                </div>
                <div className="col-md-6">
                  <h6>Email</h6>
                  <p className="text-muted">{user.email}</p>
                </div>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="alert alert-success" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  {success}
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {profile && (
                <>
                  {/* Preferred Categories */}
                  <div className="mb-4">
                    <h5 className="mb-3">
                      <i className="fas fa-tags me-2 text-primary"></i>
                      Preferred Categories
                    </h5>
                    <p className="text-muted mb-3">
                      Select the news categories you're most interested in:
                    </p>
                    <div className="row g-2">
                      {availableCategories.map(category => (
                        <div className="col-md-6 col-lg-4" key={category}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`category-${category}`}
                              checked={profile.preferred_categories.includes(category)}
                              onChange={() => handleCategoryChange(category)}
                            />
                            <label className="form-check-label" htmlFor={`category-${category}`}>
                              {category}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Sources */}
                  <div className="mb-4">
                    <h5 className="mb-3">
                      <i className="fas fa-newspaper me-2 text-primary"></i>
                      Preferred News Sources
                    </h5>
                    <p className="text-muted mb-3">
                      Choose your favorite news sources:
                    </p>
                    <div className="row g-2">
                      {availableSources.map(source => (
                        <div className="col-md-6" key={source}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`source-${source}`}
                              checked={profile.preferred_sources.includes(source)}
                              onChange={() => handleSourceChange(source)}
                            />
                            <label className="form-check-label" htmlFor={`source-${source}`}>
                              {source}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="text-center">
                    <button 
                      className="btn btn-primary btn-lg px-5"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Preferences
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile