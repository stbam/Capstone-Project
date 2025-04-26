import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useNavigate } from "react-router-dom";
import genres from "../movieGenres";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Movies({query,setQuery}) {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [shuffledGenres] = useState(() => shuffleArray(genres));

  const movieRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
  
      try {
        // Check if data is already cached
        const cachedData = localStorage.getItem("moviesByGenre");
        if (cachedData) {
          setMoviesByGenre(JSON.parse(cachedData));
          setIsLoading(false);
          return; // Don't fetch again
        }
  
        const movies = {};
        for (const genre of shuffledGenres) {
          const response = await axios.get("http://localhost:5002/genre", {
            params: { genreId: genre.id },
          });
  
          const moviePosters = await Promise.all(
            response.data.results?.map(async (movie) => {
              try {
                const detailsResponse = await axios.get(
                  `http://localhost:5002/movie/${movie.id}`
                );
                return {
                  id: movie.id,
                  title: movie.title,
                  tagline: detailsResponse.data.tagline || "",
                  overview: movie.overview,
                  release_date: movie.release_date,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average || "N/A",
                  popularity: movie.popularity || "N/A",
                  original_language: movie.original_language || "N/A",
                  genre_ids: movie.genre_ids || [],
                  runtime: detailsResponse.data.runtime || "N/A",
                };
              } catch (error) {
                console.error(`Error fetching details for movie ID ${movie.id}:`, error);
                return {
                  id: movie.id,
                  title: movie.title,
                  tagline: "",
                  overview: movie.overview,
                  release_date: movie.release_date,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average || "N/A",
                  popularity: movie.popularity || "N/A",
                  original_language: movie.original_language || "N/A",
                  genre_ids: movie.genre_ids || [],
                  runtime: "N/A",
                };
              }
            }) || []
          );
  
          movies[genre.name] = moviePosters;
        }
  
        setMoviesByGenre(movies);
        localStorage.setItem("moviesByGenre", JSON.stringify(movies)); // Store in localStorage
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };
  
    fetchMovies();
  }, [shuffledGenres]);
  

  const sendMovieDataToBackend = async (movie) => {
    try {
      await axios.post("http://localhost:5002/movie-interaction", {
        movie_id: movie.id,
        title: movie.title,
        genres: movie.genre_ids,
        rating: movie.vote_average,
        language: movie.original_language,
        popularity: movie.popularity,
        runtime: movie.runtime,
        release_date: movie.release_date,
      });
      console.log(`Sent movie "${movie.title}" interaction to backend`);
    } catch (error) {
      console.error("Error sending movie data to backend:", error);
    }
  };

  const sendMovies = () => {
    const moviesData = Object.values(moviesByGenre).flat();
    sendMoviesToBackend(moviesData);
  };

  const sendMoviesToBackend = async (moviesData) => {
    try {
      await axios.post("http://localhost:5002/batch-movie-upload", { movies: moviesData });
      console.log("Batch of movies sent to backend successfully.");
    } catch (error) {
      console.error("Error sending batch movie data to backend:", error);
    }
  };
  


  const calculateHoverBoxPosition = (movieId) => {
    const movieElement = movieRefs.current[movieId];
    if (!movieElement) return {};

    const movieRect = movieElement.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const hoverBoxWidth = 400;
    const hoverBoxMargin = 10;

    if (movieRect.left + movieRect.width / 2 < screenWidth / 2) {
      return {
        left: `${movieRect.right + hoverBoxMargin}px`,
        top: `${movieRect.top + window.scrollY}px`,
      };
    } else {
      return {
        left: `${movieRect.left - hoverBoxWidth - hoverBoxMargin}px`,
        top: `${movieRect.top + window.scrollY}px`,
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
            <div className="outer-box">
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
                        onClick={() => {
                          const isSelected = selectedMovieId === movie.id;
                          setSelectedMovieId(isSelected ? null : movie.id);
                          if (!isSelected) {
                            sendMovieDataToBackend(movie);
                          }
                        }}
                        style={{ position: "relative" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-poster"
                        />
                        {selectedMovieId === movie.id && (
                          <div
                            className="hover-box"
                            style={{
                              ...hoverBoxStyle,
                              ...calculateHoverBoxPosition(movie.id),
                            }}
                          >
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#B200ED",
                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                                cursor: "pointer",
                              }}
                              onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                              <strong>{movie.title}</strong>
                            </p>
                            {movie.tagline && (
                              <p style={{ fontStyle: "italic", opacity: 0.8, color: "white" }}>
                                {movie.tagline}
                              </p>
                            )}
                            <p style={{ color: "white" }}>
                              <strong style={{ color: "#89CFF0" }}>Rating:</strong>{" "}
                              {movie.vote_average} / 10
                            </p>
                            <p style={{ color: "white" }}>
                              <strong style={{ color: "#89CFF0" }}>Genres:</strong>{" "}
                              {movie.genre_ids
                                .map((id) => genres.find((g) => g.id === id)?.name)
                                .join(", ")}
                            </p>
                            <p style={{ color: "white" }}>
                              <strong style={{ color: "#89CFF0" }}>Popularity:</strong>{" "}
                              {movie.popularity}
                            </p>
                            <p style={{ color: "white" }}>
                              <strong style={{ color: "#89CFF0" }}>Language:</strong>{" "}
                              {movie.original_language.toUpperCase()}
                            </p>
                            <p style={{ color: "white" }}>
                              <strong style={{ color: "#89CFF0" }}>Release:</strong>{" "}
                              {movie.release_date}
                            </p>
                            <p style={{ color: "white" }}>
                              <strong style={{ color: "#89CFF0" }}>Runtime:</strong>{" "}
                              {movie.runtime !== "N/A"
                                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                                : "N/A"}
                            </p>
                            <p style={{ color: "white" }}>{movie.overview}</p>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
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
  width: "400px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 10,
  whiteSpace: "normal",
  wordWrap: "break-word",
  overflowY: "auto",
};

export default Movies;
