import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieAPI, userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // User actions state
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });

    const imageBaseUrl = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;

    useEffect(() => {
        fetchMovieDetails();
        checkUserActions();
    }, [id]);

    const fetchMovieDetails = async () => {
        setLoading(true);
        try {
            const response = await movieAPI.getDetails(id);
            setMovie(response.data.data);
        } catch (err) {
            console.error('Error fetching movie details:', err);
            setError('Failed to load movie details');
        } finally {
            setLoading(false);
        }
    };

    const checkUserActions = async () => {
        try {
            const [favResponse, watchlistResponse, reviewsResponse] = await Promise.all([
                userAPI.getFavorites(),
                userAPI.getWatchlist(),
                userAPI.getReviews()
            ]);

            const favorites = favResponse.data.data;
            const watchlist = watchlistResponse.data.data;
            const reviews = reviewsResponse.data.data;

            setIsFavorite(favorites.some(fav => fav.movieId === parseInt(id)));
            setIsInWatchlist(watchlist.some(item => item.movieId === parseInt(id)));
            
            const existingReview = reviews.find(rev => rev.movieId === parseInt(id));
            if (existingReview) {
                setUserReview(existingReview);
                setReviewForm({ rating: existingReview.rating, review: existingReview.review || '' });
            }
        } catch (err) {
            console.error('Error checking user actions:', err);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            if (isFavorite) {
                await userAPI.removeFromFavorites(id);
                setIsFavorite(false);
            } else {
                await userAPI.addToFavorites({
                    movieId: parseInt(id),
                    title: movie.title,
                    posterPath: movie.poster_path
                });
                setIsFavorite(true);
            }
        } catch (err) {
            alert('Failed to update favorites');
        }
    };

    const handleToggleWatchlist = async () => {
        try {
            if (isInWatchlist) {
                await userAPI.removeFromWatchlist(id);
                setIsInWatchlist(false);
            } else {
                await userAPI.addToWatchlist({
                    movieId: parseInt(id),
                    title: movie.title,
                    posterPath: movie.poster_path
                });
                setIsInWatchlist(true);
            }
        } catch (err) {
            alert('Failed to update watchlist');
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await userAPI.addReview({
                movieId: parseInt(id),
                rating: reviewForm.rating,
                review: reviewForm.review
            });
            setUserReview({ ...reviewForm, movieId: parseInt(id) });
            setShowReviewForm(false);
            alert(userReview ? 'Review updated!' : 'Review added!');
        } catch (err) {
            alert('Failed to submit review');
        }
    };

    const handleDeleteReview = async () => {
        if (window.confirm('Are you sure you want to delete your review?')) {
            try {
                await userAPI.deleteReview(id);
                setUserReview(null);
                setReviewForm({ rating: 5, review: '' });
            } catch (err) {
                alert('Failed to delete review');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <div className="text-center text-white text-xl py-20">Loading...</div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <div className="text-center text-red-500 text-xl py-20">{error}</div>
            </div>
        );
    }

    const backdropUrl = movie.backdrop_path 
        ? `${imageBaseUrl.replace('w500', 'original')}${movie.backdrop_path}`
        : null;

    const posterUrl = movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />

            {/* Backdrop */}
            {backdropUrl && (
                <div className="relative h-96 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backdropUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 -mt-48 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-80 rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
                        
                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-2xl mr-2">⭐</span>
                                <span className="text-white text-xl font-semibold">
                                    {movie.vote_average?.toFixed(1)}
                                </span>
                                <span className="text-gray-400 ml-2">
                                    ({movie.vote_count} votes)
                                </span>
                            </div>
                            <span className="text-gray-300">
                                {movie.release_date?.split('-')[0]}
                            </span>
                            <span className="text-gray-300">
                                {movie.runtime} min
                            </span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={handleToggleFavorite}
                                className={`px-6 py-3 rounded-lg font-semibold transition ${
                                    isFavorite
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                } text-white`}
                            >
                                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                            </button>
                            <button
                                onClick={handleToggleWatchlist}
                                className={`px-6 py-3 rounded-lg font-semibold transition ${
                                    isInWatchlist
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                } text-white`}
                            >
                                {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
                            </button>
                        </div>

                        {/* Overview */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                        </div>

                        {/* User Review Section */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Your Review</h2>
                            
                            {userReview && !showReviewForm ? (
                                <div>
                                    <div className="flex items-center mb-2">
                                        <span className="text-yellow-500 mr-2">⭐</span>
                                        <span className="text-white font-semibold">{userReview.rating}/10</span>
                                    </div>
                                    {userReview.review && (
                                        <p className="text-gray-300 mb-4">{userReview.review}</p>
                                    )}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowReviewForm(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit Review
                                        </button>
                                        <button
                                            onClick={handleDeleteReview}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Delete Review
                                        </button>
                                    </div>
                                </div>
                            ) : showReviewForm || !userReview ? (
                                <form onSubmit={handleSubmitReview}>
                                    <div className="mb-4">
                                        <label className="block text-gray-300 mb-2">
                                            Rating: {reviewForm.rating}/10
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={reviewForm.rating}
                                            onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-300 mb-2">Review (optional)</label>
                                        <textarea
                                            value={reviewForm.review}
                                            onChange={(e) => setReviewForm({...reviewForm, review: e.target.value})}
                                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            placeholder="Write your review..."
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                                        >
                                            {userReview ? 'Update Review' : 'Submit Review'}
                                        </button>
                                        {showReviewForm && (
                                            <button
                                                type="button"
                                                onClick={() => setShowReviewForm(false)}
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;