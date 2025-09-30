const express = require('express');
const router = express.Router();
const {
    getPopular,
    searchMovies,
    getMovieDetails,
    getTrending,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getGenres,
    getByGenre
} = require('../controllers/movieController');

// Public routes - no authentication required
router.get('/popular', getPopular);
router.get('/search', searchMovies);
router.get('/trending/:timeWindow', getTrending);
router.get('/top-rated', getTopRated);
router.get('/upcoming', getUpcoming);
router.get('/now-playing', getNowPlaying);
router.get('/genres', getGenres);
router.get('/genre/:genreId', getByGenre);
router.get('/:id', getMovieDetails);

module.exports = router;