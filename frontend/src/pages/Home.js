import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center px-4">
                <h1 className="text-6xl font-bold text-white mb-4">
                    🎬 Movie Recommendation App
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    Discover, track, and review your favorite movies
                </p>
                
                {!isAuthenticated ? (
                    <div className="space-x-4">
                        <Link
                            to="/login"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                        >
                            Register
                        </Link>
                    </div>
                ) : (
                    <Link
                        to="/movies"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                    >
                        Browse Movies
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Home;