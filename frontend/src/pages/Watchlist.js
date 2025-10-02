import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const response = await userAPI.getWatchlist();
            // Convert to movie format for MovieCard
            const formattedWatchlist = response.data.data.map(item => ({
                id: item.movieId,
                title: item.title,
                poster_path: item.posterPath,
                vote_average: 0,
                release_date: ''
            }));
            setWatchlist(formattedWatchlist);
        } catch (err) {
            console.error('Error fetching watchlist:', err);
            setError('Failed to load watchlist');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">
                    📋 My Watchlist
                </h1>

                {loading && (
                    <div className="text-center text-white text-xl py-20">
                        Loading watchlist...
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {!loading && !error && watchlist.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {watchlist.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && watchlist.length === 0 && (
                    <div className="text-center text-gray-400 text-xl py-20">
                        <p className="mb-4">Your watchlist is empty!</p>
                        <p>Add movies you want to watch later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;