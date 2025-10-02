import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieAPI } from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            searchMovies();
        }
    }, [query]);

    const searchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await movieAPI.search(query);
            setMovies(response.data.data.results);
        } catch (err) {
            console.error('Error searching movies:', err);
            setError('Failed to search movies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-8">
                    Search Results for "{query}"
                </h1>

                {loading && (
                    <div className="text-center text-white text-xl py-20">
                        Searching...
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {!loading && !error && movies.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && movies.length === 0 && (
                    <div className="text-center text-gray-400 text-xl py-20">
                        No movies found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;