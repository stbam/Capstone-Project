import React, { useEffect, useState } from "react";
import axios from "axios";

function SteamGameDetails({ appId }) {
    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/game-details/${appId}`);
                console.log("Fetched Game Details:", response.data); // Debugging output
                setGameDetails(response.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };

        if (appId) {
            fetchGameDetails();
        }
    }, [appId]);

    if (!gameDetails) {
        return <p style={{ color: "white" }}>Loading game details...</p>;
    }

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
            <p>{gameDetails.name}</p>
            <p>{gameDetails.short_description || "No description available."}</p>
        </div>
    );
}

export default SteamGameDetails;
