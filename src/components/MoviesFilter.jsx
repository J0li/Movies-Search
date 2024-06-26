import React, { useState } from "react";
import './MoviesFilter.css';

function MoviesFilter() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const searchMovies = async () => {
        try {
            const response = await fetch('http://www.omdbapi.com//?t=<string>&i=<string>&s=<string>&y=<integer>&type=<string>&plot=short&tomatoes=false&r=json&v=1&page=1&callback=<string>');
            const data = await response.json();
            if (data.Response === 'True') {
                setMovies(data.Search);
                setError('');
            } else {
                setMovies([]);
                setError(data.Error);
            }
        } catch (error) {
            console.error('Error while searching movies:', error);
            setError('Error searching movies. Please try again later.');
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searchMovies();
    };

    return (
        <div className="search-box">
            <h2>Movies search</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleChange} placeholder="Type the name of the movie" />
                <button className="btn" type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>
                        <h3>{movie.Title}</h3>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesFilter;
