import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'

const Navbar = ({ user, setUser, theme, toggleTheme }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const categories = ['India', 'Technology', 'Sports', 'Business', 'Entertainment', 'World', 'Politics', 'Health']

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          <i className="fas fa-newspaper me-2"></i>
          DailyScoop
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/for-you">
                  <i className="fas fa-heart text-danger me-1"></i>
                  For You
                </Link>
              </li>
            )}
            {categories.map(category => (
              <li className="nav-item" key={category}>
                <Link className="nav-link" to={`/category/${category}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-secondary me-2" 
              onClick={toggleTheme}
              title="Toggle theme"
            >
              <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
            </button>

            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown">
                  <i className="fas fa-user me-1"></i>
                  {user.username}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-cog me-2"></i>Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar