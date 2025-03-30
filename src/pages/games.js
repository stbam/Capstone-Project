import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useNavigate } from "react-router-dom";
import genres from "../genreToMap"; // Ensure correct path to game genres or static data

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export const useGamesData = () => {
  const [gamesByGenre, setGamesByGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = {};
        const genrePromises = genres.map((genre) =>
          axios.get(`http://localhost:5001/api/games-by-tag/${genre.name}`).then(async (response) => {
            const gamePosters = response.data
              ? shuffleArray(response.data).slice(0, 16).map((game) => ({
                  id: game.appid,
                  name: game.name,
                }))
              : [];

            // Fetch detailed data for each game
            const detailedGames = await Promise.all(
              gamePosters.map(async (game) => {
                try {
                  const detailsResponse = await axios.get(`http://localhost:5001/api/game-details/${game.id}`, {
                    headers: {
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                  });
                  return {
                    ...game,
                    header_image: detailsResponse.data.header_image || "default_image_url", // Fetch header_image
                    short_description: detailsResponse.data.short_description || "No description available",
                    price_overview: detailsResponse.data.price_overview?.final_formatted || "Free or Unavailable",
                    developers: detailsResponse.data.developers || ["Unknown"],
                    publishers: detailsResponse.data.publishers || ["Unknown"],
                  };
                } catch (error) {
                  console.error(`Error fetching details for game ${game.id}:`, error);
                  return game; // Return the basic game data if details fetch fails
                }
              })
            );

            games[genre.name] = detailedGames;
          })
        );

        await Promise.all(genrePromises);
        console.log("Fetched games with details by genre:", games); // Debugging
        setGamesByGenre(games);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { gamesByGenre, isLoading };
};

function Games() {
  const [gamesByGenre, setGamesByGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGameId, setSelectedGameId] = useState(null); // Track the selected game for the details box
  const [shuffledGenres] = useState(() => shuffleArray(genres));
  const [gameDetails, setGameDetails] = useState({}); // To store the game details including header_image

  const gameRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = {};
        const genrePromises = shuffledGenres.map((genre) =>
          axios.get(`http://localhost:5001/api/games-by-tag/${genre.name}`).then((response) => {
            const gamePosters = response.data
              ? shuffleArray(response.data) // Shuffle the games array
                  .slice(0, 16) // Take the first 16 random games
                  .map((game) => ({
                    id: game.appid,
                    name: game.name,
                  }))
              : [];
            games[genre.name] = gamePosters;

            // Prefetch game details for each game
            gamePosters.forEach((game) => fetchGameDetails(game.id));
          })
        );

        await Promise.all(genrePromises);
        setGamesByGenre(games);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [shuffledGenres]);

  const fetchGameDetails = async (appid) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/game-details/${appid}`);
      setGameDetails((prevDetails) => ({
        ...prevDetails,
        [appid]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(selectedGameId === gameId ? null : gameId); // Toggle the details box
  };

  const calculateHoverBoxPosition = (gameId) => {
    const gameElement = gameRefs.current[gameId];
    const gameRect = gameElement.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const gameCenter = gameRect.left + gameRect.width / 2;

    const hoverBoxOffset = 400; // Hover box width

    if (gameCenter < screenWidth / 2) {
      // Game is on the left side of the screen, hover box goes to the right
      return { left: "100%", transform: "translateX(10px)" };
    } 
    else {
      const distanceToRightEdge = screenWidth - gameRect.right;
      if (distanceToRightEdge < hoverBoxOffset) {

        return { right: "100%", transform: `translateX(-${hoverBoxOffset + 45}px)` };
      } else {
        return { right: "100%", transform: "translateX(-10px)" };
      }
    }
    
  };

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
            <div className="foryou-box">
              <div className="swiper-wrapper-container">
                <Swiper
                  className="swiper-slides-container-game"
                  spaceBetween={10}
                  slidesPerView={5}
                  grid={{ rows: 2, fill: "row" }}
                  modules={[Navigation, Grid, Pagination]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  style={{ width: "100%" }}
                >
                  {gamesByGenre[name]?.length > 0 ? (
                    gamesByGenre[name].map((game) => (
                      <SwiperSlide key={game.id} className="swiper-slide-game">
                        <div
                          className="image-container-game"
                          ref={(el) => (gameRefs.current[game.id] = el)}
                          onClick={() => handleGameClick(game.id)} // Handle click to toggle details box
                          style={{
                            position: "relative",
                            borderRadius: "8px",
                          }}
                        >
                          {gameDetails[game.id]?.header_image ? (
                            <div>
                              <img
                                src={gameDetails[game.id]?.header_image || "default_image_url"}
                                alt={game.name}
                                style={{ width: "100%", borderRadius: "8px" }}
                              />
                            </div>
                          ) : (
                            <div
                              className="game-name"
                              style={{ textAlign: "center", fontSize: "18px", color: "white" }}
                            >
                              {game.name}
                            </div>
                          )}
            {/* Render the details box if this game is selected */}
{selectedGameId === game.id && (
  <div
    className="hover-box-wrapper"
    style={{
      position: "fixed", // Ensure it renders above everything
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 9999, // Ensure it appears above all other elements
      pointerEvents: "auto", // Allow interaction with the hover box
    }}
    onClick={() => setSelectedGameId(null)} // Close the hover box when clicking outside
  >
    <div
      className="hover-box"
      style={{
        ...hoverBoxStyle,
        ...calculateHoverBoxPosition(game.id), // Adjust hover box position
      }}
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside the hover box from closing it
    >
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#B200ED", // Same color as in movies.js
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Add a shadow for better readability
          cursor: "pointer", // Make it look clickable
        }}
        onClick={() => navigate(`/game/${game.id}`)} // Navigate to the game details page
      >
        {game.name}
      </h3>
      <p><strong style={{color: "#89CFF0"}}>Description:</strong> {gameDetails[game.id]?.short_description || "No description available"}</p>
      <p><strong style={{color: "#89CFF0"}}>Developer:</strong> {gameDetails[game.id]?.developers?.join(", ") || "Unknown"}</p>
      <p><strong style={{color: "#89CFF0"}}>Publisher:</strong> {gameDetails[game.id]?.publishers?.join(", ") || "Unknown"}</p>
      <p><strong style={{color: "#89CFF0"}}>Price:</strong> {gameDetails[game.id]?.price_overview?.final_formatted || "Free or Unavailable"}</p>
      <p><strong style={{color: "#89CFF0"}}>Genres:</strong> {gameDetails[game.id]?.genres?.map((g) => g.name).join(", ") || "Unknown"}</p>
      <p><strong style={{color: "#89CFF0"}}>Supported Languages:</strong> {gameDetails[game.id]?.supported_languages?.join(", ") || "Unknown"}</p>
      <p><strong style={{color: "#89CFF0"}}>Platforms: </strong> 
        {gameDetails[game.id]?.platforms?.windows && "Windows "}
        {gameDetails[game.id]?.platforms?.mac && "Mac "}
        {gameDetails[game.id]?.platforms?.linux && "Linux "}
      </p>
    </div>
  </div>
)}
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>No games available for this genre</p>
                  )}
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
  top: "-10px",
  width: "400px", // Adjust width as needed
  maxHeight: "280px", // Set a maximum height for the hover-box
  backgroundColor: "rgba(0, 0, 0, 0.9)", // Slightly darker background for better readability
  color: "white",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow for better visibility
  zIndex: 9999, // Ensure it appears above all other elements
  whiteSpace: "normal", // Ensure text wraps
  wordWrap: "break-word", // Allow breaking long words
  overflowY: "auto", // Enable vertical scrolling if content exceeds maxHeight
};

export default Games;