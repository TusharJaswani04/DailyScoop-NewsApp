# 📰 DailyScoop News Aggregator

**A modern, full-stack news application that aggregates personalized news from major Indian sources using React, Django, and MongoDB with AI-powered summarization.**

Transform the way you consume news with intelligent filtering, real-time updates, and seamless social sharing across all devices.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation) ::::  NOTE: requirements.txt is already given in the project 
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Features](#features)

---

## 🎯 About the Project

DailyScoop is a comprehensive news aggregation platform designed to solve information overload by providing personalized news feeds from trusted Indian sources. Unlike generic news apps, it combines RSS feed aggregation, AI summarization, and user preference learning to deliver exactly what matters to you.

**Problem Solved:** Traditional news apps show the same content to everyone. DailyScoop learns your preferences and creates a personalized "For You" feed while maintaining access to all categories.

**Key Innovation:** Hybrid database architecture using Django's proven authentication system with MongoDB's flexibility for dynamic news content.

---

## 🚀 Key Features

### 🔐 Smart Authentication
- **Session-based Login/Signup** - No JWT complexity, built-in Django security
- **Automatic Profile Sync** - Django signals create MongoDB profiles seamlessly  
- **Password Security** - PBKDF2 encryption with CSRF protection

### 📡 News Aggregation
- **Multi-Source RSS** - 6 major Indian sources (Times of India, NDTV, Indian Express, etc.)
- **Dual API Integration** - Backup news fetching for 100% uptime
- **Smart Deduplication** - Prevents duplicate articles across sources
- **Real-time Updates** - Fresh content every refresh cycle

### 🤖 AI-Powered Intelligence
- **Gemini API Summaries** - 3-4 line article summaries for quick reading
- **Smart Categorization** - Automatic tagging and classification
- **Personalized Feeds** - "For You" page based on reading preferences
- **Advanced Search** - MongoDB text indexing for instant results

### ⚛️ Modern User Interface
- **React 18 + Vite** - Lightning-fast loading and development
- **Bootstrap 5** - Mobile-first responsive design
- **Infinite Scroll** - Seamless browsing of 1000+ articles
- **Social Sharing** - One-click sharing to WhatsApp, Facebook, Twitter, LinkedIn
- **Dark/Light Theme** - User preference with localStorage persistence

---

## 🛠️ Technology Stack

| **Frontend** | **Backend** | **Database** | **AI/Tools** |
|--------------|-------------|--------------|--------------|
| React 18 | Django 4.2 | SQLite (Auth) | Google Gemini API |
| Vite | Django REST Framework | MongoDB 7.0 (News) | RSS Feed Parsing |
| Bootstrap 5 | MongoEngine ODM | Redis (Caching) | Docker & Docker Compose |
| React Router | Django Signals | MongoDB Atlas | VS Code Integration |
| Axios | Gunicorn (Production) | | ESLint & Prettier |

---

## 📥 Installation

### **Prerequisites**
Make sure you have the following installed:
- **Python 3.11+** - [Download Python](https://python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **MongoDB 7.0+** - [Install MongoDB](https://docs.mongodb.com/manual/installation/)
- **Git** - [Install Git](https://git-scm.com/downloads)

### **Quick Setup (Recommended)**

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dailyscoop-news-app.git
cd dailyscoop-news-app

# 2. Backend Setup
cd backend
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# OR
venv\Scripts\activate     # On Windows

# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env file with your configuration

# Run database migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# 3. Frontend Setup (New Terminal)
cd frontend
npm install

# Setup environment variables
cp .env.example .env

# 4. Start MongoDB Service
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: Start MongoDB service from Services

# 5. Start Development Servers
# Terminal 1 - Backend
cd backend
python manage.py runserver

# Terminal 2 - Frontend  
cd frontend
npm run dev

# 6. Load Initial News Data
cd backend
python manage.py fetch_news
```

### **Docker Setup (Alternative)**

```bash
# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Access Your Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/
- **API Documentation**: http://localhost:8000/api/docs/

---

## 📖 Usage Guide

### **For End Users**

1. **Browse Latest News**
   - Visit the homepage to see the latest articles from all sources
   - Use category navigation (Tech, Sports, Business, etc.) for filtered content

2. **Create Account & Personalize**
   ```
   1. Click "Sign Up" → Fill registration form
   2. Login → Go to Profile page  
   3. Select preferred categories and news sources
   4. Visit "For You" page for personalized feed
   ```

3. **Search & Discover**
   - Use the search bar to find specific topics
   - Click on articles to read full content with AI summary
   - Share articles via social media buttons

4. **Mobile Experience**
   - Fully responsive design works on all devices
   - Touch-friendly navigation and infinite scroll
   - Progressive Web App capabilities

### **For Developers**

```bash
# Fetch fresh news data
python manage.py fetch_news

# Access Django shell for debugging
python manage.py shell

# Run backend tests
python manage.py test

# Run frontend tests
npm test

# Check code quality
npm run lint
pip install flake8 && flake8

# Build production version
npm run build
python manage.py collectstatic
```

---

## 📁 Project Structure

```
DailyScoop-News-App/
├── 📄 README.md                    # Project documentation
├── 📄 docker-compose.yml           # Container orchestration
├── 📄 .gitignore                   # Git ignore rules
├── 📄 LICENSE                      # MIT License
├── 📄 setup.sh                     # Automated setup script
│
├── 📁 backend/                     # Django Backend
│   ├── 📁 dailyscoop/             # Django project settings
│   │   ├── settings.py             # Database & API configuration
│   │   ├── urls.py                 # Main URL routing  
│   │   └── wsgi.py                 # Production server config
│   ├── 📁 accounts/                # User authentication app
│   │   ├── views.py                # Login/signup API endpoints
│   │   ├── signals.py              # MongoDB profile auto-creation
│   │   ├── serializers.py          # User data serialization
│   │   └── urls.py                 # Authentication URLs
│   ├── 📁 news/                    # News management app  
│   │   ├── models.py               # MongoDB news & profile models
│   │   ├── views.py                # News API endpoints
│   │   ├── utils.py                # RSS parsing & data processing
│   │   ├── serializers.py          # News data serialization
│   │   └── 📁 management/commands/ # Custom Django commands
│   │       └── fetch_news.py       # News fetching script
│   ├── 📄 requirements.txt         # Python dependencies
│   ├── 📄 .env.example            # Environment template
│   └── 📄 manage.py               # Django CLI tool
│
├── 📁 frontend/                    # React Frontend
│   ├── 📁 public/                 # Static assets
│   │   ├── index.html             # Main HTML template
│   │   └── favicon.ico            # App icon
│   ├── 📁 src/                    # Source code
│   │   ├── 📁 components/         # Reusable React components
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── NewsCard.jsx       # Individual news article card
│   │   │   ├── NewsList.jsx       # News grid with infinite scroll
│   │   │   ├── SearchBar.jsx      # Search input component  
│   │   │   ├── ShareButton.jsx    # Social sharing buttons
│   │   │   └── Footer.jsx         # Site footer
│   │   ├── 📁 pages/              # Page-level components
│   │   │   ├── Home.jsx           # Homepage with latest news
│   │   │   ├── Login.jsx          # User login form
│   │   │   ├── Signup.jsx         # User registration form
│   │   │   ├── ForYou.jsx         # Personalized news feed
│   │   │   ├── Category.jsx       # Category-specific news
│   │   │   ├── ArticleDetail.jsx  # Full article view
│   │   │   └── Profile.jsx        # User settings & preferences
│   │   ├── 📁 services/           # API integration
│   │   │   ├── api.js             # News API calls
│   │   │   └── auth.js            # Authentication API calls
│   │   ├── 📄 App.jsx             # Main application component
│   │   ├── 📄 App.css             # Global styling
│   │   └── 📄 main.jsx            # React entry point
│   ├── 📄 package.json            # Node.js dependencies
│   ├── 📄 vite.config.js          # Build tool configuration
│   └── 📄 .env.example           # Frontend environment template
│
└── 📁 .vscode/                    # VS Code workspace settings
    ├── settings.json              # Editor configuration
    ├── launch.json                # Debug configuration
    └── extensions.json            # Recommended extensions
```

---

## 🔌 API Documentation

### **Authentication Endpoints**
```http
POST /api/auth/signup/          # User registration
POST /api/auth/login/           # User login  
POST /api/auth/logout/          # User logout
GET  /api/auth/status/          # Check login status
GET  /api/auth/profile/         # Get user profile
PUT  /api/auth/profile/         # Update user preferences
```

### **News Endpoints**
```http
GET  /api/news/                 # Get all news (paginated)
GET  /api/news/category/{name}/ # Get news by category
GET  /api/news/for-you/         # Get personalized news (auth required)
GET  /api/news/{id}/            # Get article details + AI summary
GET  /api/news/search/?q={query} # Search articles
POST /api/refresh-news/         # Trigger news refresh
```

### **Example API Usage**
```javascript
// Get personalized news
const response = await fetch('/api/news/for-you/', {
  credentials: 'include',  // Include session cookies
  headers: {
    'Content-Type': 'application/json',
  }
});
const personalizedNews = await response.json();

// Search for articles
const searchResponse = await fetch('/api/news/search/?q=technology');
const searchResults = await searchResponse.json();
```

---

## ✨ Features

### **🎯 Core Functionality**
- ✅ **Real-time News Aggregation** - Fetches from 6+ Indian news sources
- ✅ **Smart Deduplication** - Prevents duplicate articles across sources  
- ✅ **AI Summarization** - Quick 3-4 line summaries using Gemini API
- ✅ **Infinite Scrolling** - Smooth browsing of 1000+ articles
- ✅ **Advanced Search** - Full-text search with MongoDB indexing
- ✅ **Social Sharing** - One-click sharing to major platforms

### **👤 User Experience**
- ✅ **Personalized Feeds** - "For You" page based on preferences
- ✅ **Category Navigation** - Filter by Tech, Sports, Business, etc.
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, desktop
- ✅ **Dark/Light Theme** - User preference with persistence
- ✅ **Fast Loading** - Optimized with Vite and lazy loading
- ✅ **Offline Support** - Progressive Web App capabilities

### **🔧 Technical Features**
- ✅ **Hybrid Database** - SQLite for auth, MongoDB for content
- ✅ **Session Authentication** - Secure without JWT complexity
- ✅ **Auto Profile Sync** - Django signals create MongoDB profiles
- ✅ **API Rate Limiting** - Prevents abuse and ensures stability
- ✅ **Error Handling** - Graceful fallbacks and user feedback
- ✅ **Code Quality** - ESLint, Prettier, Black formatting

### **🚀 Performance**
- ✅ **Sub-second Loading** - Optimized MongoDB queries
- ✅ **Efficient Caching** - Redis for frequently accessed data
- ✅ **Bundle Optimization** - Tree shaking and code splitting
- ✅ **Image Optimization** - WebP format with fallbacks
- ✅ **Database Indexing** - Optimized for search and filtering

---

## 📸 Screenshots

### **Homepage - Latest News**
```
🏠 Clean, modern interface showing latest articles in a responsive grid
📱 Mobile-optimized with touch-friendly navigation
🔍 Prominent search bar for quick article discovery
```

### **For You Page - Personalized Feed**
```
❤️ Customized news based on user-selected preferences  
🎯 Smart filtering by categories and sources
📊 Preference indicators showing user's interests
```

### **Article Detail - Full Reading Experience**  
```
📖 Clean reading interface with AI-generated summaries
📤 Social sharing buttons for WhatsApp, Facebook, Twitter
🔗 Direct links to original articles on news sites
```

### **User Profile - Preference Management**
```
⚙️ Easy-to-use checkboxes for category selection
📰 News source preferences for personalized feeds  
💾 Instant saving with success confirmation
```

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can help improve DailyScoop:

### **🔧 Development Process**

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/your-username/dailyscoop-news-app.git
   cd dailyscoop-news-app
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Set Up Development Environment**
   ```bash
   # Follow installation instructions above
   # Make sure all tests pass before making changes
   python manage.py test  # Backend tests
   npm test               # Frontend tests
   ```

4. **Make Your Changes**
   - Follow existing code style and patterns
   - Add tests for new functionality
   - Update documentation as needed

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add amazing new feature: detailed description"
   git push origin feature/amazing-new-feature
   ```

6. **Open a Pull Request**
   - Go to GitHub and click "New Pull Request"
   - Provide a clear description of changes
   - Reference any related issues

### **📋 Contribution Guidelines**

**Code Style:**
- **Python**: Follow PEP 8, use Black formatter, and isort for imports
- **JavaScript**: Use ESLint and Prettier configurations provided
- **React**: Functional components with hooks, no class components
- **CSS**: Use Bootstrap classes when possible, minimal custom CSS


*Stay informed. Stay ahead. Stay with DailyScoop.*
