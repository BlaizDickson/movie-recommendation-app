const tmdbService = require('../services/tmdbService');

// @desc    Get popular movies
// @route   GET /api/movies/popular
// @access  Public
const getPopular = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await tmdbService.getPopularMovies(page);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Search movies
// @route   GET /api/movies/search
// @access  Public
const searchMovies = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }
        
        const data = await tmdbService.searchMovies(query, page);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get movie details
// @route   GET /api/movies/:id
// @access  Public
const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await tmdbService.getMovieDetails(id);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get trending movies
// @route   GET /api/movies/trending/:timeWindow
// @access  Public
const getTrending = async (req, res) => {
    try {
        const { timeWindow = 'week' } = req.params;
        const data = await tmdbService.getTrendingMovies(timeWindow);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get top rated movies
// @route   GET /api/movies/top-rated
// @access  Public
const getTopRated = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await tmdbService.getTopRatedMovies(page);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get upcoming movies
// @route   GET /api/movies/upcoming
// @access  Public
const getUpcoming = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await tmdbService.getUpcomingMovies(page);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get now playing movies
// @route   GET /api/movies/now-playing
// @access  Public
const getNowPlaying = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const data = await tmdbService.getNowPlayingMovies(page);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get movie genres
// @route   GET /api/movies/genres
// @access  Public
const getGenres = async (req, res) => {
    try {
        const data = await tmdbService.getGenres();
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get movies by genre
// @route   GET /api/movies/genre/:genreId
// @access  Public
const getByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;
        const { page = 1 } = req.query;
        const data = await tmdbService.getMoviesByGenre(genreId, page);
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getPopular,
    searchMovies,
    getMovieDetails,
    getTrending,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getGenres,
    getByGenre
};