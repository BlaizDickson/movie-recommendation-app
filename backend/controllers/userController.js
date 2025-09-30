const User = require('../models/User');

// @desc    Add movie to favorites
// @route   POST /api/users/favorites
// @access  Private
const addToFavorites = async (req, res) => {
    try {
        const { movieId, title, posterPath } = req.body;
        
        if (!movieId || !title) {
            return res.status(400).json({
                success: false,
                message: 'Movie ID and title are required'
            });
        }
        
        const user = await User.findById(req.user._id);
        
        // Check if movie already in favorites
        const isAlreadyFavorite = user.favorites.some(
            fav => fav.movieId === movieId
        );
        
        if (isAlreadyFavorite) {
            return res.status(400).json({
                success: false,
                message: 'Movie already in favorites'
            });
        }
        
        user.favorites.push({ movieId, title, posterPath });
        await user.save();
        
        res.status(201).json({
            success: true,
            message: 'Movie added to favorites',
            data: user.favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Remove movie from favorites
// @route   DELETE /api/users/favorites/:movieId
// @access  Private
const removeFromFavorites = async (req, res) => {
    try {
        const { movieId } = req.params;
        const user = await User.findById(req.user._id);
        
        user.favorites = user.favorites.filter(
            fav => fav.movieId !== parseInt(movieId)
        );
        
        await user.save();
        
        res.json({
            success: true,
            message: 'Movie removed from favorites',
            data: user.favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        res.json({
            success: true,
            count: user.favorites.length,
            data: user.favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Add movie to watchlist
// @route   POST /api/users/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
    try {
        const { movieId, title, posterPath } = req.body;
        
        if (!movieId || !title) {
            return res.status(400).json({
                success: false,
                message: 'Movie ID and title are required'
            });
        }
        
        const user = await User.findById(req.user._id);
        
        const isAlreadyInWatchlist = user.watchlist.some(
            item => item.movieId === movieId
        );
        
        if (isAlreadyInWatchlist) {
            return res.status(400).json({
                success: false,
                message: 'Movie already in watchlist'
            });
        }
        
        user.watchlist.push({ movieId, title, posterPath });
        await user.save();
        
        res.status(201).json({
            success: true,
            message: 'Movie added to watchlist',
            data: user.watchlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Remove movie from watchlist
// @route   DELETE /api/users/watchlist/:movieId
// @access  Private
const removeFromWatchlist = async (req, res) => {
    try {
        const { movieId } = req.params;
        const user = await User.findById(req.user._id);
        
        user.watchlist = user.watchlist.filter(
            item => item.movieId !== parseInt(movieId)
        );
        
        await user.save();
        
        res.json({
            success: true,
            message: 'Movie removed from watchlist',
            data: user.watchlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user watchlist
// @route   GET /api/users/watchlist
// @access  Private
const getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        res.json({
            success: true,
            count: user.watchlist.length,
            data: user.watchlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Add/Update movie review
// @route   POST /api/users/reviews
// @access  Private
const addReview = async (req, res) => {
    try {
        const { movieId, rating, review } = req.body;
        
        if (!movieId || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Movie ID and rating are required'
            });
        }
        
        if (rating < 1 || rating > 10) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 10'
            });
        }
        
        const user = await User.findById(req.user._id);
        
        // Check if review already exists
        const existingReviewIndex = user.reviews.findIndex(
            rev => rev.movieId === movieId
        );
        
        if (existingReviewIndex !== -1) {
            // Update existing review
            user.reviews[existingReviewIndex].rating = rating;
            user.reviews[existingReviewIndex].review = review;
            user.reviews[existingReviewIndex].createdAt = new Date();
        } else {
            // Add new review
            user.reviews.push({ movieId, rating, review });
        }
        
        await user.save();
        
        res.status(201).json({
            success: true,
            message: existingReviewIndex !== -1 ? 'Review updated' : 'Review added',
            data: user.reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete review
// @route   DELETE /api/users/reviews/:movieId
// @access  Private
const deleteReview = async (req, res) => {
    try {
        const { movieId } = req.params;
        const user = await User.findById(req.user._id);
        
        user.reviews = user.reviews.filter(
            rev => rev.movieId !== parseInt(movieId)
        );
        
        await user.save();
        
        res.json({
            success: true,
            message: 'Review deleted',
            data: user.reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user reviews
// @route   GET /api/users/reviews
// @access  Private
const getReviews = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        res.json({
            success: true,
            count: user.reviews.length,
            data: user.reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.user._id);
        
        if (username) user.username = username;
        if (email) user.email = email;
        
        const updatedUser = await user.save();
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    addToWatchlist,
    removeFromWatchlist,
    getWatchlist,
    addReview,
    deleteReview,
    getReviews,
    updateProfile
};