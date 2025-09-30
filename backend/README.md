# Movie Recommendation API - Backend

RESTful API backend for the Movie Recommendation App built with Express.js, MongoDB, and TMDB API integration.

## Features

- ✅ User Authentication (JWT-based)
- ✅ Movie Discovery (TMDB Integration)
- ✅ User Favorites Management
- ✅ Watchlist Functionality
- ✅ Movie Reviews & Ratings
- ✅ User Profile Management
- ✅ Secure Password Hashing
- ✅ Protected Routes with Middleware

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **External API:** TMDB (The Movie Database)
- **Password Hashing:** bcryptjs

## Installation

# Install dependencies
npm install

# Setup environment variables (see .env.example)
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start

## Environment Variables
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
NODE_ENV=development

## Request/Response Examples

POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}

## Project Structure

backend/
├── config/
│   └── database.js         # MongoDB connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── movieController.js  # Movie operations
│   └── userController.js   # User features
├── middleware/
│   └── auth.js            # JWT authentication
├── models/
│   └── User.js            # User schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── movieRoutes.js     # Movie endpoints
│   └── userRoutes.js      # User endpoints
├── services/
│   └── tmdbService.js     # TMDB API integration
├── utils/
│   └── generateToken.js   # JWT token generator
├── .env                   # Environment variables
├── .env.example          # Environment template
├── server.js             # Entry point
└── package.json          # Dependencies

## Author: Bakeung Dickson
