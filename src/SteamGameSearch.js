import React, { useState } from "react";

function SteamGameSearch({ onSelect }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/search/${searchQuery}`);

            // Log response headers to check content type
            console.log("Response Headers:", response.headers.get("content-type"));
    
            // Log raw response text before parsing
            const textData = await response.text();  
            console.log("Raw response text:", textData); 
    
            // Check if response is valid JSON
            try {
                const data = JSON.parse(textData);  
                setSearchResults(data);
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
                {searchResults.map((game) => (
                    <li key={game.appid} onClick={() => handleSelect(game)}>
                        {game.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SteamGameSearch;
