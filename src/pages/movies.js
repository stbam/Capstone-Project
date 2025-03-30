import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useNavigate } from "react-router-dom";
import genres from "../movieGenres"; // Ensure correct path

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Movies() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [shuffledGenres] = useState(() => shuffleArray(genres));

  const movieRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = {};
        for (const genre of shuffledGenres) {
          const response = await axios.get("http://localhost:5002/genre", {
            params: { genreId: genre.id },
          });

          const moviePosters = await Promise.all(
            response.data.results?.map(async (movie) => {
              try {
                const detailsResponse = await axios.get(
                  `http://localhost:5002/movie/${movie.id}` // Fetch movie details
                );
                return {
                  id: movie.id,
                  title: movie.title,
                  tagline: detailsResponse.data.tagline || "", // Get tagline
                  overview: movie.overview,
                  release_date: movie.release_date,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average || "N/A",
                  popularity: movie.popularity || "N/A",
                  original_language: movie.original_language || "N/A",
                  genre_ids: movie.genre_ids || [],
                  runtime: detailsResponse.data.runtime || "N/A", // Add runtime here
                };
              } catch (error) {
                console.error(`Error fetching details for movie ID ${movie.id}:`, error);
                return {
                  id: movie.id,
                  title: movie.title,
                  tagline: "", // If API fails, keep tagline empty
                  overview: movie.overview,
                  release_date: movie.release_date,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average || "N/A",
                  popularity: movie.popularity || "N/A",
                  original_language: movie.original_language || "N/A",
                  genre_ids: movie.genre_ids || [],
                  runtime: "N/A", // Set default if error fetching details
                };
              }
            }) || []
          );

          movies[genre.name] = moviePosters;
        }
        setMoviesByGenre(movies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [shuffledGenres]);

  const calculateHoverBoxPosition = (movieId) => {
    const movieElement = movieRefs.current[movieId];
    if (!movieElement) return {}; // Return an empty object if the element is not found
  
    const movieRect = movieElement.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const hoverBoxWidth = 400; // Width of the hover box
    const hoverBoxMargin = 10; // Margin between the hover box and the movie item
  
    // Determine if the movie item is on the left or right side of the screen
    if (movieRect.left + movieRect.width / 2 < screenWidth / 2) {
      // Movie is on the left side of the screen, hover box goes to the right
      return {
        left: `${movieRect.right + hoverBoxMargin}px`, // Position to the right of the movie item
        top: `${movieRect.top + window.scrollY}px`, // Align vertically with the movie item
      };
    } else {
      // Movie is on the right side of the screen, hover box goes to the left
      return {
        left: `${movieRect.left - hoverBoxWidth - hoverBoxMargin}px`, // Position to the left of the movie item
        top: `${movieRect.top + window.scrollY}px`, // Align vertically with the movie item
      };
    }
  };

  return (
    <div>
      <div className="page-content">
        <h1>Movies</h1>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        shuffledGenres.map(({ name }) => (
          <div className="category" key={name}>
            <h2>{name}</h2>
            <div className="foryou-moviebox">
              <div className="swiper-wrapper-container">
                <Swiper
                  className="swiper-slides-container-movie"
                  spaceBetween={10}
                  slidesPerView={5}
                  grid={{ rows: 2, fill: "row" }}
                  modules={[Navigation, Grid, Pagination]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  style={{ width: "100%" }}
                >
                  {moviesByGenre[name]?.map((movie) => (
                    <SwiperSlide key={movie.id} className="swiper-slide-movie">
                      <div
                        className="image-container"
                        ref={(el) => (movieRefs.current[movie.id] = el)}
                        onClick={() => setSelectedMovieId(selectedMovieId === movie.id ? null : movie.id)}
                        style={{ position: "relative" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-poster" // Add a class to the img element
                        />
                        {selectedMovieId === movie.id && (
                          <div
                            className="hover-box"
                            style={{
                              ...hoverBoxStyle,
                              ...calculateHoverBoxPosition(null, movie.id), // Adjust hover box position
                            }}
                          >
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#B200ED",
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                                cursor: "pointer" // Add cursor pointer style
                              }}
                              onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to movie details page
                            >
                              <strong>{movie.title}</strong>
                            </p>
                            {movie.tagline && (
                              <p style={{ fontStyle: "italic", opacity: 0.8, color: "white" }}> {/* Change text color to white */}
                                {movie.tagline}
                              </p>
                            )}
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              <strong style={{color: "#89CFF0"}}>Rating:</strong> {movie.vote_average} / 10
                            </p>
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              <strong style={{color: "#89CFF0"}}>Genres:</strong>{" "}
                              {movie.genre_ids
                                .map((id) => genres.find((g) => g.id === id)?.name)
                                .join(", ")}
                            </p>
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              <strong style={{color: "#89CFF0"}}>Popularity:</strong> {movie.popularity}
                            </p>
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              <strong style={{color: "#89CFF0"}}>Language:</strong>{" "}
                              {movie.original_language.toUpperCase()}
                            </p>
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              <strong style={{color: "#89CFF0"}}>Release:</strong> {movie.release_date}
                            </p>
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              <strong style={{color: "#89CFF0"}}>Runtime:</strong>{" "}
                              {movie.runtime !== "N/A"
                                ? `${Math.floor(movie.runtime / 60)}h ${
                                    movie.runtime % 60
                                  }m`
                                : "N/A"}
                            </p>
                            <p style={{ color: "white" }}> {/* Change text color to white */}
                              {movie.overview}
                            </p>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const hoverBoxStyle = {
  position: "absolute",
  top: "0",
  width: "400px", // Adjust width as needed
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 10,
  whiteSpace: "normal", // Ensure text wraps
  wordWrap: "break-word", // Allow breaking long words
  overflowY: "auto", // Enable vertical scrolling if content exceeds maxHeight
};

export default Movies;