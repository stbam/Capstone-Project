import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Games() {
  const [gamesByGenre, setGamesByGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [shuffledGenres, setShuffledGenres] = useState([]);
  const gameRefs = useRef({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/genres");
        const genres = response.data;
        setShuffledGenres(shuffleArray(genres));  // Shuffle genres
        console.log("Genres:", genres);

        fetchGamesByGenres(genres);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };

    const fetchGamesByGenres = async (genres) => {
      try {
        const games = {};
        for (const genre of genres) {
          const response = await axios.get(`http://localhost:5001/api/games-by-genre/${genre.id}`);
          console.log(`Games for genre ${genre.name}:`, response.data);
          games[genre.name] = response.data;
        }
        setGamesByGenre(games);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <div className="page-content">
        <h1>Games</h1>
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
                {Array.isArray(gamesByGenre[name]) && gamesByGenre[name].length > 0 ? (
                  gamesByGenre[name].map((game) => (
                    <SwiperSlide key={game.id} className="swiper-slide-movie">
                      <div className="image-container" ref={(el) => gameRefs.current[game.id] = el}>
                        <h2>{game.name}</h2>
                        <p>{game.short_description || "No description available."}</p>
                        {game.header_image && (
                          <img
                            src={game.header_image}
                            alt={game.name}
                            style={{ width: "100%", borderRadius: "8px" }}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <p>No games available for {name}.</p>
                )}
              </Swiper>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Games;
