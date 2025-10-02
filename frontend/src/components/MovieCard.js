import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const imageBaseUrl = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;
    const posterUrl = movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-2 truncate">
                        {movie.title}
                    </h3>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                            {movie.release_date?.split('-')[0] || 'N/A'}
                        </span>
                        <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">⭐</span>
                            <span className="text-white text-sm">
                                {movie.vote_average?.toFixed(1) || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;