import React, { useState } from "react";
import SteamGameSearch from "../SteamGameSearch";
import SteamGameDetails from "../SteamGameDetails";

function SteamGameSearchPage() {
    const [selectedAppId, setSelectedAppId] = useState(null);

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", // Full viewport height
        backgroundColor: "#333", // Optional: Background color for contrast
    };

    const headerStyle = {
        color: "white",
        fontSize: "2.5rem",
        textAlign: "center",
        margin: "20px",
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Steam Game Finder Debugging page :D</h1>
            <SteamGameSearch onSelect={setSelectedAppId} />
            {selectedAppId && <SteamGameDetails appId={selectedAppId} />}
        </div>
    );
}

export default SteamGameSearchPage;
