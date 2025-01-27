import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

function MovieDetail() {
    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const imdbID = location.state?.imdbID;

    useEffect(() => {
        if (!imdbID) {
            navigate('/');
            return;
        }

        const fetchMovieDetails = async () => {
            const detailsData = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=201f83a1`);
            const detailsResponse = await detailsData.json();
            setMovieDetails(detailsResponse);
        };

        fetchMovieDetails();
    }, [imdbID, navigate]);

    if (!movieDetails) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold">{movieDetails.Title}</h2>
                    <button 
                        onClick={() => navigate('/')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <img 
                        src={movieDetails.Poster} 
                        alt={movieDetails.Title}
                        className="w-full md:w-48 h-72 object-cover rounded"
                    />
                    <div className="flex-1">
                        <p className="mb-2"><span className="font-semibold">Year:</span> {movieDetails.Year}</p>
                        <p className="mb-2"><span className="font-semibold">Genre:</span> {movieDetails.Genre}</p>
                        <p className="mb-2"><span className="font-semibold">Director:</span> {movieDetails.Director}</p>
                        <p className="mb-2"><span className="font-semibold">Actors:</span> {movieDetails.Actors}</p>
                        <p className="mb-4"><span className="font-semibold">Plot:</span> {movieDetails.Plot}</p>
                        <p className="mb-2"><span className="font-semibold">IMDb Rating:</span> {movieDetails.imdbRating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail