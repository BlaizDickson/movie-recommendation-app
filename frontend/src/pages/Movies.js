import React from 'react';
import { useAuth } from '../context/AuthContext';

const Movies = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Welcome, {user?.username}! 🎬
                </h1>
                <p className="text-gray-400 text-lg">
                    Movie browser coming soon...
                </p>
            </div>
        </div>
    );
};

export default Movies;