const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// All routes are protected (require authentication)
router.use(protect);

// Favorites routes
router.route('/favorites')
    .get(getFavorites)
    .post(addToFavorites);
router.delete('/favorites/:movieId', removeFromFavorites);

// Watchlist routes
router.route('/watchlist')
    .get(getWatchlist)
    .post(addToWatchlist);
router.delete('/watchlist/:movieId', removeFromWatchlist);

// Reviews routes
router.route('/reviews')
    .get(getReviews)
    .post(addReview);
router.delete('/reviews/:movieId', deleteReview);

// Profile routes
router.put('/profile', updateProfile);

module.exports = router;