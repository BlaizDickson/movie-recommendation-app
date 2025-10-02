# Movie Recommendation App - Frontend

React-based frontend for the Movie Recommendation App with full TMDB integration and user features.

## Features

- ✅ User Authentication (Login/Register)
- ✅ Movie Browsing (Popular, Top Rated, Upcoming, Now Playing)
- ✅ Movie Search
- ✅ Detailed Movie Pages
- ✅ Add to Favorites
- ✅ Watchlist Management
- ✅ Movie Reviews & Ratings
- ✅ User Profile Dashboard
- ✅ Responsive Design
- ✅ Protected Routes

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Context API

## Installation
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
## Project Structure
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Navigation bar
│   │   └── MovieCard.js        # Movie card component
│   ├── context/
│   │   └── AuthContext.js      # Authentication state management
│   ├── pages/
│   │   ├── Home.js             # Landing page
│   │   ├── Login.js            # Login page
│   │   ├── Register.js         # Registration page
│   │   ├── Movies.js           # Movie browsing page
│   │   ├── Search.js           # Search results page
│   │   ├── MovieDetails.js     # Movie details page
│   │   ├── Favorites.js        # User favorites page
│   │   ├── Watchlist.js        # User watchlist page
│   │   └── Profile.js          # User profile page
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.js                  # Main app component
│   └── index.js                # Entry point
├── .env                        # Environment variables
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies

## Environment Variables
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

## Available Scripts

npm start - Start development server
npm build - Build for production
npm test - Run tests

## Features Overview
# Authentication

-JWT-based authentication
-Protected routes
-Persistent login with -localStorage

# Movie Discovery

Browse by categories
Search movies by title
View detailed movie information
See cast, crew, and similar movies

# User Features

Save favorite movies
Create watchlist
Rate and review movies
View personal statistics

## Deployment
Ready for deployment

Netlify
Vercel
AWS Amplify
GitHub Pages (with hash routing)


Version: 1.0.0
Built with: React + Tailwind CSS