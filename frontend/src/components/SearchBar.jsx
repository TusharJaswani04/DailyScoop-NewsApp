import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <form onSubmit={handleSubmit} className="d-flex">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search news articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={handleClear}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!query.trim()}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar