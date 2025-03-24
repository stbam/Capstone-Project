import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
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

  const calculateHoverBoxPosition = (event, movieId) => {
    const movieElement = movieRefs.current[movieId];
    const movieRect = movieElement.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const movieCenter = movieRect.left + movieRect.width / 2;
  
    // Adjust hover box further left if the poster is too close to the right edge
    const hoverBoxOffset = 400; // Hover box width
  
    // Determine if the hover box should appear to the left or right
    if (movieCenter < screenWidth / 2) {
      // Poster is on the left of the screen, hover box goes to the right
      return { left: "100%", transform: "translateX(10px)" }; // Move to the right
    } else {
      // Poster is on the right of the screen, hover box goes to the left
      const distanceToRightEdge = screenWidth - movieRect.right; // Distance to the right edge of the screen
      if (distanceToRightEdge < hoverBoxOffset) {
        // If the hover box is too close to the right edge, move it further to the left
        return { right: "100%", transform: `translateX(-${hoverBoxOffset + 45}px)` }; // Move more to the left
      } else {
        // Default case, move the hover box to the left with a slight offset
        return { right: "100%", transform: "translateX(-10px)" }; // Move to the left
      }
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
                      ref={(el) => movieRefs.current[movie.id] = el}
                      onClick={() => setSelectedMovieId(selectedMovieId === movie.id ? null : movie.id)}
                      style={{ position: "relative" }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: "100%", height: "auto", cursor: "pointer" }}
                      />
                      {selectedMovieId === movie.id && (
                      <div
                        className="hover-box"
                        style={{
                          ...hoverBoxStyle,
                          ...calculateHoverBoxPosition(null, movie.id), // Adjust hover box position
                        }}
                      >
                        <p style={{ fontSize: "24px", fontWeight: "bold", color: "#89CFF0", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
                          <strong>{movie.title}</strong>
                        </p>
                        {movie.tagline && <p style={{ fontStyle: "italic", opacity: 0.8 }}>{movie.tagline}</p>}
                        <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                        <p><strong>Genres:</strong> {movie.genre_ids.map(id => genres.find(g => g.id === id)?.name).join(", ")}</p>
                        <p><strong>Popularity:</strong> {movie.popularity}</p>
                        <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
                        <p><strong>Release:</strong> {movie.release_date}</p>
                        <p><strong>Runtime:</strong> {movie.runtime !== "N/A" ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"}</p>
                        <p>{movie.overview}</p>

                      </div>
                    )}

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
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
