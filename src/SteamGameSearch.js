import React, { useState } from "react";

function SteamGameSearch({ onSelect, searchQuery, setSearchQuery, setSearchResults, searchResults }) {
    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/search/${searchQuery}`);

            const textData = await response.text();  // Log raw response text for debugging
            console.log("Raw response text:", textData);

            try {
                const data = JSON.parse(textData);
                setSearchResults(data);  // Set the search results
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelect = (game) => {
        onSelect(game.appid); // Pass the selected appId to the parent component
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a game..."
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {(Array.isArray(searchResults) ? searchResults : []).map((game) => (
                    <li key={game.appid} onClick={() => handleSelect(game)}>
                        {game.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SteamGameSearch;
