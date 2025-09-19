import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Category from './pages/Category'
import ForYou from './pages/ForYou'
import ArticleDetail from './pages/ArticleDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

// Services
import { checkAuthStatus } from './services/auth'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Check authentication status on app load
    const checkAuth = async () => {
      try {
        const userData = await checkAuthStatus()
        setUser(userData)
      } catch (error) {
        console.error(error)
        console.log('User not authenticated')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('dailyscoop-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('dailyscoop-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="App min-vh-100 d-flex flex-column">
        <Navbar 
          user={user} 
          setUser={setUser} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route 
              path="/for-you" 
              element={user ? <ForYou /> : <Navigate to="/login" />} 
            />
            <Route path="/article/:articleId" element={<ArticleDetail />} />
            <Route 
              path="/login" 
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App