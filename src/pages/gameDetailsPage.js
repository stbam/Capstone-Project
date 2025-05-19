import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ButtonGroup, Button } from "@mui/material";

function GameDetailsPage() {
  const { id } = useParams(); // Get the game ID from the URL
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/game-details/${id}`);
        setGameDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);


  const handleWantToPlay = async () => {
        const userId = localStorage.getItem("userId"); // assuming it's stored in localStorage
        const gameData = {
          title: gameDetails.name,
          genre: gameDetails.genres?.map((g) => g.name).join(", "),
          description: gameDetails.short_description,
          userId,
          thumbnail: gameDetails.header_image,
          id: gameDetails.id || id // fallback to URL param
        };
      
        try {
          const response = await fetch("http://localhost:3003/want-to-play", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(gameData)
          });
      
          if (response.ok) {
            console.log(gameData.id,"this is frontend ID")

            console.log("Game added to your Want To Play list!");
          } else {
            console.error("Failed to add game.");
          }
        } catch (error) {
          console.error("Error adding game:", error);
        }
      };


  if (isLoading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  if (!gameDetails) {
    return <p style={{ color: "white" }}>Game details not found.</p>;
  }

  return (
    <div style={{ color: "white", padding: "20px" }}>
      {/* Display the header image */}
      {gameDetails.header_image && (
        <img
          src={gameDetails.header_image}
          alt={`${gameDetails.name} Header`}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
      )}
      <h1 style={{ color: "#89CFF0", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
        {gameDetails.name}
      </h1>
      <ButtonGroup sx={{ mt: 2 }} >
        <Button variant="contained" color="primary" onClick={handleWantToPlay}>Want To Play </Button> 
        <a href={gameDetails.infoLink} target="_blank" rel="noopener noreferrer">
          <Button variant="contained" color="primary">
            More Info
          </Button>
        </a>
      </ButtonGroup>
      <p>
        <strong style={{ color: "#89CFF0" }}>Description:</strong> {gameDetails.short_description || "No description available."}
      </p>
      <p>
        <strong style={{ color: "#89CFF0" }}>Developer:</strong> {gameDetails.developers?.join(", ") || "Unknown"}
      </p>
      <p>
        <strong style={{ color: "#89CFF0" }}>Publisher:</strong> {gameDetails.publishers?.join(", ") || "Unknown"}
      </p>
      <p>
        <strong style={{ color: "#89CFF0" }}>Price:</strong> {gameDetails.price_overview?.final_formatted || "Free or Unavailable"}
      </p>
      <p>
        <strong style={{ color: "#89CFF0" }}>Genres:</strong> {gameDetails.genres?.map((g) => g.name).join(", ") || "Unknown"}
      </p>
      <p>
        <strong style={{ color: "#89CFF0" }}>Supported Languages:</strong> {gameDetails.supported_languages?.join(", ") || "Unknown"}
      </p>
      <p>
        <strong style={{ color: "#89CFF0" }}>Platforms:</strong> 
        {gameDetails.platforms?.windows && "Windows "}
        {gameDetails.platforms?.mac && "Mac "}
        {gameDetails.platforms?.linux && "Linux "}
      </p>
    </div>
  );
}

export default GameDetailsPage;