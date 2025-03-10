const express = require('express');
const axios = require('axios');
const cors = require('cors');
const {fetchSteamGameDetails} = require('./steamApiHelper');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Search for games
app.get("/api/search/:query", async (req, res) => {
    try {
        const query = req.params.query;
        const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;
        const { data } = await axios.get(url);
        const appList = data.applist.apps;

        const results = appList
            .filter(game => game.name && game.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.name.toLowerCase() === query.toLowerCase() ? -1 : b.name.toLowerCase() === query.toLowerCase() ? 1 : 0)
            .map(game => ({
                appid: game.appid,
                name: game.name,
            }));

        const uniqueResults = Array.from(new Map(results.map(item => [item.appid, item])).values());

        // Fetch detailed game descriptions
        const detailedResults = await Promise.all(uniqueResults.map(async (game) => {
            const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${game.appid}`;
            try {
                const { data: detailsData } = await axios.get(gameDetailsUrl);
                if (detailsData[game.appid]?.success) {
                    const gameDetails = detailsData[game.appid]?.data;
                    game.description = gameDetails?.short_description || "No description available.";
                } else {
                    game.description = "No description available.";
                }
            } catch (error) {
                game.description = "No description available.";
            }
            return game;
        }));

        if (detailedResults.length > 0) {
            res.json(detailedResults);
        } else {
            res.status(404).json({ message: "No games found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch game data" });
    }
});

// Game details route
app.get("/api/game-details/:appid", async (req, res) => {
    try {
        const appid = req.params.appid;
        const gameDetails = await fetchSteamGameDetails(appid);
        res.json(gameDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch game details", details: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
