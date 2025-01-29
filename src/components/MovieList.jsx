import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function MovieList({ searchValue }) {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [selectedType, setSelectedType] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    let fetchMovies = async (searchValue, page, type) => {
        if (!searchValue) {
            setMovies([]);
            setTotalResults(0);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const typeQuery = type ? `&type=${type}` : '';
            const moviesData = await fetch(
                `https://www.omdbapi.com/?s=${searchValue}${typeQuery}&page=${page}&apikey=201f83a1`
            );

            if (!moviesData.ok) {
                throw new Error('Network response was not ok');
            }

            const movieResponse = await moviesData.json();

            if (movieResponse.Response === "True" && movieResponse.Search) {
                setMovies(movieResponse.Search);
                setTotalResults(parseInt(movieResponse.totalResults));
                setError(null);
            } else {
                setMovies([]);
                setTotalResults(0);
                setError(movieResponse.Error || 'No results found');
            }
        } catch (error) {
            setMovies([]);
            setTotalResults(0);
            setError('Failed to fetch movies. Please try again later.');
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchMovies(searchValue, 1, selectedType);
    }, [searchValue, selectedType]);

    useEffect(() => {
        fetchMovies(searchValue, currentPage, selectedType);
    }, [currentPage]);

    const handleMovieClick = (movie) => {
        navigate('/MovieDetail', { state: { imdbID: movie.imdbID } });
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(totalResults / 10);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-lg text-red-500 mb-2">
                        {error === "Movie not found!" ? "No movies found. Try a different search." : error}
                    </div>
                    {error === "Too many results." && (
                        <div className="text-gray-600">
                            Please be more specific in your search.
                        </div>
                    )}
                </div>
            );
        }

        if (!searchValue) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Enter a search term to find movies</div>
                </div>
            );
        }

        if (movies.length === 0) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">No movies found for your search</div>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-5 gap-4 px-8">
                {movies.map((movie, index) => (
                    <div 
                        key={index} 
                        className="p-4 bg-white rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleMovieClick(movie)}
                    >
                        <img 
                            className="object-cover w-full h-48 rounded-md" 
                            src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/200/300'} 
                            alt={movie.Title}
                            onError={(e) => {
                                e.target.src = '/api/placeholder/200/300';
                            }}
                        />
                        <div className="flex-1 mt-4">
                            <h3 className="line-clamp-2 text-lg font-semibold">{movie.Title}</h3>
                        </div>
                        <div className="flex-1 mt-4">
                            <p className="line-clamp-2 text-sm text-gray-500">{movie.Type}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="flex bg-gray-100">
                <div className="w-full p-6 overflow-y-auto">
                    <div className="px-8 mb-6">
                        <select
                            value={selectedType}
                            onChange={handleTypeChange}
                            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="movie">Movies</option>
                            <option value="series">Series</option>
                            <option value="episode">Episodes</option>
                        </select>
                    </div>

                    {renderContent()}
                    
                    {totalResults > 0 && (
                        <div className="flex justify-center items-center mt-8 gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MovieList