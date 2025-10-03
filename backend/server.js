

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [
            process.env.FRONTEND_URL,
            /\.onrender\.com$/  // Allow all Render domains
          ]
        : 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Movie Recommendation API is running!',
        version: '1.0.0',
        environment: process.env.NODE_ENV,
        endpoints: {
            auth: '/api/auth',
            movies: '/api/movies',
            users: '/api/users'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Server Error',
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
