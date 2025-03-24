import React, { useState } from "react";
import SteamGameSearch from "../SteamGameSearch";
import SteamGameDetails from "../SteamGameDetails";

function SteamGameSearchPage() {
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");  // Track the search query
    const [searchResults, setSearchResults] = useState([]);  // Initialize searchResults as an empty array

    const handleClear = () => {
        setSelectedAppId(null);  // Clear the selected game details
        setSearchQuery("");  // Clear the search query in SteamGameSearch
        setSearchResults([]);  // Reset searchResults to an empty array
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        color: "white",
    };

    const headerStyle = {
        color: "white",
        fontSize: "2.5rem",
        textAlign: "center",
        margin: "20px",
    };

    const searchContainerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "20px",
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Steam Game Finder Debugging Page :D</h1>
            <div style={searchContainerStyle}>
                <SteamGameSearch 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    setSearchResults={setSearchResults} 
                    searchResults={searchResults}  // Pass searchResults to SteamGameSearch
                    onSelect={setSelectedAppId} 
                />
                {selectedAppId && (
                    <>
                        <SteamGameDetails appId={selectedAppId} />
                        <button 
                            onClick={handleClear} 
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                fontSize: "1rem",
                                backgroundColor: "#ff4444",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SteamGameSearchPage;
