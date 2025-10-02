import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await userAPI.getFavorites();
            // Convert to movie format for MovieCard
            const formattedFavorites = response.data.data.map(fav => ({
                id: fav.movieId,
                title: fav.title,
                poster_path: fav.posterPath,
                vote_average: 0,
                release_date: ''
            }));
            setFavorites(formattedFavorites);
        } catch (err) {
            console.error('Error fetching favorites:', err);
            setError('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">
                    ❤️ My Favorites
                </h1>

                {loading && (
                    <div className="text-center text-white text-xl py-20">
                        Loading favorites...
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {!loading && !error && favorites.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {favorites.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && favorites.length === 0 && (
                    <div className="text-center text-gray-400 text-xl py-20">
                        <p className="mb-4">No favorites yet!</p>
                        <p>Start adding movies to your favorites list.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;