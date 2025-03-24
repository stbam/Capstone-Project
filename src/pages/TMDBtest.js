import React, { useState } from "react";

/* THIS IS THE FRONTEND FOR THE TMDB API TEST PAGE */

function TMDBtest() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Store the detailed movie info
    const [error, setError] = useState(null);

    // Fetch movies by name
    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:5002/search?query=${query}`);
            const data = await response.json();
            if (response.ok) {
                setMovies(data.results);
                setError(null);
            } else {
                setError(data.error || "Something went wrong");
                setMovies([]);
            }
        } catch (err) {
            setError("Failed to fetch movies");
            setMovies([]);
        }
    };

    // Fetch movie details by ID
    const fetchMovieDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/movie/${id}`);
            const data = await response.json();
            if (response.ok) {
                setSelectedMovie(data);
            } else {
                setError(data.error || "Failed to fetch movie details");
            }
        } catch (err) {
            setError("Failed to fetch movie details");
        }
    };

    // Styles
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        color: "white",
    };

    const headerStyle = {
        color: "white",
        fontSize: "2.5rem",
        textAlign: "center",
        margin: "20px",
    };

    const searchContainerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "20px",
    };

    const resultsContainerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center results vertically
        alignItems: "center", // Center results horizontally
        marginTop: "20px",
        width: "100%", // Take full width to center the content
    };

    const movieItemStyle = {
        margin: "15px",
        textAlign: "center",
        cursor: "pointer",
        color: "lightblue",
    };

    const movieDetailsContainerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center the movie details vertically
        alignItems: "center", // Center the movie details horizontally
        marginTop: "20px",
        width: "80%", // Give it some width so it doesn't stretch too far
        maxWidth: "800px", // Max width for readability
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>TMDB Debugging and Tests</h1>
            <div style={searchContainerStyle}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    style={{ padding: "10px", fontSize: "16px" }}
                />
                <button onClick={fetchMovies} style={{ padding: "10px", marginTop: "10px" }}>
                    Search
                </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Display search results */}
            <div style={resultsContainerStyle}>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} style={movieItemStyle}>
                            <h3
                                onClick={() => fetchMovieDetails(movie.id)}
                                style={{ cursor: "pointer", color: "lightblue" }}
                            >
                                {movie.title}
                            </h3>
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>

            {/* Display selected movie details */}
            <div style={movieDetailsContainerStyle}>
                {selectedMovie && (
                    <div>
                        <h2>{selectedMovie.title}</h2>
                        {selectedMovie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
                                alt={selectedMovie.title}
                            />
                        )}
                        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                        <p><strong>Genres:</strong> {selectedMovie.genres.map((genre) => genre.name).join(", ")}</p>
                        <p><strong>Budget:</strong> ${selectedMovie.budget.toLocaleString()}</p>
                        <p><strong>Revenue:</strong> ${selectedMovie.revenue.toLocaleString()}</p>
                        <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
                        <p><strong>Tagline:</strong> {selectedMovie.tagline}</p>
                        <p><strong>IMDB ID:</strong> {selectedMovie.imdb_id}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TMDBtest;
