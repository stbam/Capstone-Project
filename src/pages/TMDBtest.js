import React, { useState } from "react";

/* THIS IS THE FRONTEND FOR THE TMDB API TEST PAGE */

function TMDBtest() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Store the detailed movie info
    const [error, setError] = useState(null);
    const [selectedMovieImages, setSelectedMovieImages] = useState(null);
    const [credits, setCredits] = useState(null);

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
                fetchMovieImages(id); // Fetch images after setting movie details
                fetchMovieCredits(id); // Fetch movie credits using id
            } else {
                setError(data.error || "Failed to fetch movie details");
            }
        } catch (err) {
            setError("Failed to fetch movie details");
        }
    };
    

    const fetchMovieImages = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/movie/${id}/images`);
            const data = await response.json();
            if (response.ok) {
                setSelectedMovieImages(data); // Store images data to display
            } else {
                setError(data.error || "Failed to fetch movie images");
            }
        } catch (err) {
            setError("Failed to fetch movie images");
        }
    };

    const fetchMovieCredits = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/movie/${id}/credits`);
            const data = await response.json();
            if (response.ok) {
                setCredits(data); // Store credits data
            } else {
                setError(data.error || "Failed to fetch movie credits");
            }
        } catch (err) {
            setError("Failed to fetch movie credits");
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
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{width: "290px", height: "435px"}}
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
                    src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    style={{width: "290px", height: "435px"}}
                />
            )}
            <p><strong style={{color: "#905ca0"}}>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong style={{color: "905ca0"}}>Genres:</strong> {selectedMovie.genres.map((genre) => genre.name).join(", ")}</p>
            <p><strong style={{color: "#905ca0"}}>Budget:</strong> ${selectedMovie.budget.toLocaleString()}</p>
            <p><strong style={{color: "#905ca0"}}>Revenue:</strong> ${selectedMovie.revenue.toLocaleString()}</p>
            <p><strong style={{color: "#905ca0"}}>Runtime:</strong> {selectedMovie.runtime} minutes</p>
            <p><strong style={{color: "#905ca0"}}>Tagline:</strong> {selectedMovie.tagline}</p>
            <p><strong style={{color: "#905ca0"}}>IMDB ID:</strong> {selectedMovie.imdb_id}</p>


            <p><strong style={{ color: "#905ca0" }}>Credits:</strong>{" "}{credits?.cast?.map((member) => (
                <span key={member.id}>
                    {member.name} ({member.original_name}) - {member.known_for_department} as {member.character}{", "}
                </span>
                ))}
            </p>

            

            {/* Movie Images (Posters & Backdrops) */}
            {selectedMovieImages && (
                <div>
                    <h3>Images</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectedMovieImages.posters && selectedMovieImages.posters.map((poster) => (
                            <img 
                                key={poster.file_path} 
                                src={`https://image.tmdb.org/t/p/original${poster.file_path}`} /* possible placement for original image qualities? */
                                alt="Movie Poster"
                                style={{width: "290px", height: "435px"}} 
                            />
                        ))}
                        
                        {selectedMovieImages.backdrops && selectedMovieImages.backdrops.map((backdrop) => (
                            <img 
                                key={backdrop.file_path} 
                                src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`} 
                                alt="Movie Backdrop" 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )}
</div>

        </div>
    );
}

export default TMDBtest;
