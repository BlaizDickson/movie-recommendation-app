import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/me'),
};

// Movie API calls
export const movieAPI = {
    getPopular: (page = 1) => api.get(`/movies/popular?page=${page}`),
    search: (query, page = 1) => api.get(`/movies/search?query=${query}&page=${page}`),
    getDetails: (id) => api.get(`/movies/${id}`),
    getTrending: (timeWindow = 'week') => api.get(`/movies/trending/${timeWindow}`),
    getTopRated: (page = 1) => api.get(`/movies/top-rated?page=${page}`),
    getUpcoming: (page = 1) => api.get(`/movies/upcoming?page=${page}`),
    getNowPlaying: (page = 1) => api.get(`/movies/now-playing?page=${page}`),
    getGenres: () => api.get('/movies/genres'),
    getByGenre: (genreId, page = 1) => api.get(`/movies/genre/${genreId}?page=${page}`),
};

// User API calls
export const userAPI = {
    // Favorites
    getFavorites: () => api.get('/users/favorites'),
    addToFavorites: (movieData) => api.post('/users/favorites', movieData),
    removeFromFavorites: (movieId) => api.delete(`/users/favorites/${movieId}`),
    
    // Watchlist
    getWatchlist: () => api.get('/users/watchlist'),
    addToWatchlist: (movieData) => api.post('/users/watchlist', movieData),
    removeFromWatchlist: (movieId) => api.delete(`/users/watchlist/${movieId}`),
    
    // Reviews
    getReviews: () => api.get('/users/reviews'),
    addReview: (reviewData) => api.post('/users/reviews', reviewData),
    deleteReview: (movieId) => api.delete(`/users/reviews/${movieId}`),
    
    // Profile
    updateProfile: (userData) => api.put('/users/profile', userData),
};

export default api;