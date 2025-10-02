# 🎬 Movie Recommendation App

A full-stack movie recommendation application built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with The Movie Database (TMDB) API.

## 🌟 Features

### User Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### Movie Discovery
- Browse popular, top-rated, upcoming, and now playing movies
- Search movies by title
- Filter by genres
- View detailed movie information (cast, crew, similar movies)
- High-quality movie posters and backdrops

### User Features
- **Favorites:** Save your favorite movies
- **Watchlist:** Create a list of movies to watch later
- **Reviews:** Rate movies (1-10) and write reviews
- **Profile:** View your stats and activity

### Responsive Design
- Mobile-friendly interface
- Modern UI with Tailwind CSS
- Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### External APIs
- TMDB API for movie data

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- TMDB API key

## 🚀 Installation & Setup

### 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/movie-recommendation-app.git
cd movie-recommendation-app

## 📱 Usage

Register a new account or Login
Browse movies by different categories
Search for specific movies
Click on a movie to view details
Add movies to your favorites or watchlist
Rate and review movies
View your profile to see your activity

## 📁 Project Structure
movie-recommendation-app/
├── backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── services/          # External API services
│   └── server.js          # Entry point
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js
│   └── package.json
└── README.md

## 🔐 Environment Variables
Backend (.env)
envPORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
NODE_ENV=development
Frontend (.env)
envREACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
🌐 API Endpoints
Authentication

POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user (Protected)

Movies

GET /api/movies/popular - Get popular movies
GET /api/movies/search?query= - Search movies
GET /api/movies/:id - Get movie details
GET /api/movies/trending/:timeWindow - Get trending movies
GET /api/movies/top-rated - Get top rated movies

## User Features (All Protected)

GET /api/users/favorites - Get user favorites
POST /api/users/favorites - Add to favorites
DELETE /api/users/favorites/:movieId - Remove from favorites
GET /api/users/watchlist - Get watchlist
POST /api/users/watchlist - Add to watchlist
DELETE /api/users/watchlist/:movieId - Remove from watchlist
GET /api/users/reviews - Get user reviews
POST /api/users/reviews - Add/update review
DELETE /api/users/reviews/:movieId - Delete review

## 🚀 Deployment
Backend (Render/Heroku)

Create account on Render or Heroku
Connect GitHub repository
Set environment variables
Deploy

Frontend (Netlify/Vercel)

Create account on Netlify or Vercel
Connect GitHub repository
Set build command: npm run build
Set publish directory: build
Add environment variables
Deploy

## 👤 Author
Bakeung Dickson


## 🙏 Acknowledgments

TMDB for the movie API
Tailwind CSS for the styling framework

