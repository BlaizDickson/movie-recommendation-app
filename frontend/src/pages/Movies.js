import React, { useState, useEffect } from 'react';
import { movieAPI } from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('popular');

    useEffect(() => {
        fetchMovies();
    }, [category]);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;
            switch (category) {
                case 'popular':
                    response = await movieAPI.getPopular();
                    break;
                case 'top_rated':
                    response = await movieAPI.getTopRated();
                    break;
                case 'upcoming':
                    response = await movieAPI.getUpcoming();
                    break;
                case 'now_playing':
                    response = await movieAPI.getNowPlaying();
                    break;
                default:
                    response = await movieAPI.getPopular();
            }
            setMovies(response.data.data.results);
        } catch (err) {
            console.error('Error fetching movies:', err);
            setError('Failed to load movies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Category Tabs */}
                <div className="flex space-x-4 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setCategory('popular')}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            category === 'popular'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Popular
                    </button>
                    <button
                        onClick={() => setCategory('top_rated')}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            category === 'top_rated'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Top Rated
                    </button>
                    <button
                        onClick={() => setCategory('upcoming')}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            category === 'upcoming'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setCategory('now_playing')}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            category === 'now_playing'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        Now Playing
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center text-white text-xl py-20">
                        Loading movies...
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Movies Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && movies.length === 0 && (
                    <div className="text-center text-gray-400 text-xl py-20">
                        No movies found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movies;