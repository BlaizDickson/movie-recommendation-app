const axios = require('axios');

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Helper function to make TMDB API calls
const tmdbRequest = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
            params: {
                api_key: TMDB_API_KEY,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.error('TMDB API Error:', error.response?.data || error.message);
        throw new Error('Failed to fetch data from TMDB');
    }
};

// Get popular movies
const getPopularMovies = async (page = 1) => {
    return await tmdbRequest('/movie/popular', { page });
};

// Search movies by title
const searchMovies = async (query, page = 1) => {
    return await tmdbRequest('/search/movie', { query, page });
};

// Get movie details by ID
const getMovieDetails = async (movieId) => {
    return await tmdbRequest(`/movie/${movieId}`, {
        append_to_response: 'credits,videos,similar'
    });
};

// Get movies by genre
const getMoviesByGenre = async (genreId, page = 1) => {
    return await tmdbRequest('/discover/movie', {
        with_genres: genreId,
        page
    });
};

// Get trending movies
const getTrendingMovies = async (timeWindow = 'week') => {
    return await tmdbRequest(`/trending/movie/${timeWindow}`);
};

// Get top rated movies
const getTopRatedMovies = async (page = 1) => {
    return await tmdbRequest('/movie/top_rated', { page });
};

// Get upcoming movies
const getUpcomingMovies = async (page = 1) => {
    return await tmdbRequest('/movie/upcoming', { page });
};

// Get now playing movies
const getNowPlayingMovies = async (page = 1) => {
    return await tmdbRequest('/movie/now_playing', { page });
};

// Get movie genres list
const getGenres = async () => {
    return await tmdbRequest('/genre/movie/list');
};

module.exports = {
    getPopularMovies,
    searchMovies,
    getMovieDetails,
    getMoviesByGenre,
    getTrendingMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getGenres
};