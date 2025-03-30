import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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