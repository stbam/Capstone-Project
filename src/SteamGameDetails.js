import React, { useEffect, useState } from "react";
import axios from "axios";

function SteamGameDetails({ appId }) {
    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:5001/api/game-details/${appId}`);
                console.log("Fetched Game Details:", response.data);
                setGameDetails(response.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
                setError("Failed to fetch game details.");
            }

            setLoading(false);
        };

        if (appId) {
            fetchGameDetails();
        }
    }, [appId]);

    if (loading) return <p style={{ color: "white" }}>Loading game details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!gameDetails) return null;

    return (
        <div style={{
            color: "white",
            backgroundColor: "#444",
            padding: "15px",
            borderRadius: "8px",
            maxWidth: "600px",
            textAlign: "center",
            marginTop: "20px",
        }}>
            <h2>{gameDetails.name}</h2>
            <p>{gameDetails.short_description || "No description available."}</p>
            {gameDetails.header_image && <img src={gameDetails.header_image} alt={gameDetails.name} style={{ width: "100%", borderRadius: "8px" }} />}

            <div style={{ textAlign: "left", marginTop: "20px" }}>
                <h3>Full JSON Fetched</h3>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", textAlign: "left", background: "#333", padding: "10px", borderRadius: "8px" }}>
                    {JSON.stringify(gameDetails, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default SteamGameDetails;
