import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Profile = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const [reviewsRes, favoritesRes, watchlistRes] = await Promise.all([
                userAPI.getReviews(),
                userAPI.getFavorites(),
                userAPI.getWatchlist()
            ]);
            setReviews(reviewsRes.data.data);
            setFavorites(favoritesRes.data.data);
            setWatchlist(watchlistRes.data.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-gray-800 rounded-lg p-8 mb-8">
                    <div className="flex items-center mb-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {user?.username}
                            </h1>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                {favorites.length}
                            </div>
                            <div className="text-gray-300">Favorites</div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-500 mb-2">
                                {watchlist.length}
                            </div>
                            <div className="text-gray-300">Watchlist</div>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-yellow-500 mb-2">
                                {reviews.length}
                            </div>
                            <div className="text-gray-300">Reviews</div>
                        </div>
                    </div>
                </div>

                {/* Recent Reviews */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Recent Reviews
                    </h2>

                    {loading ? (
                        <div className="text-center text-gray-400 py-8">
                            Loading reviews...
                        </div>
                    ) : reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div
                                    key={review.movieId}
                                    className="bg-gray-700 rounded-lg p-4"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <span className="text-yellow-500 mr-2">⭐</span>
                                            <span className="text-white font-semibold">
                                                {review.rating}/10
                                            </span>
                                        </div>
                                        <span className="text-gray-400 text-sm">
                                            Movie ID: {review.movieId}
                                        </span>
                                    </div>
                                    {review.review && (
                                        <p className="text-gray-300">{review.review}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-8">
                            No reviews yet. Start reviewing movies!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;