const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { fetchSteamGameDetails } = require('./steamApiHelper');
const genreToMap = require('./genreToMap');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for Frontend
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests like Postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Helper function to fetch and format game details
/*const fetchDetailedGames = async (games) => {
  return await Promise.all(games.map(async (game) => {
    try {
      const gameDetails = await fetchSteamGameDetails(game.appid);
      return {
        ...game,
        short_description: gameDetails.short_description || "No description available",
        header_image: gameDetails.header_image || "No image available",
      };
    } catch (error) {
      console.error(`Error fetching details for game ${game.appid}:`, error.message);
      return null; // Skip game if error occurs
    }
  })).then(results => results.filter(game => game !== null));
};
*/

/* Third party Steam API endpoint -- fetch by genre */
app.get("/api/games-by-tag/:tag", async (req, res) => {
  const tag = req.params.tag;

  try {
    const url = `https://steamspy.com/api.php?request=tag&tag=${encodeURIComponent(tag)}`;
    const { data } = await axios.get(url);

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ message: `No games found for tag: ${tag}` });
    }

    const games = Object.values(data).map(game => ({
      appid: game.appid,
      name: game.name,
      owners: game.owners,
      price: game.price,
      positive: game.positive,
      negative: game.negative,
      score_rank: game.score_rank,
      genres: game.genres ? game.genres.split(', ') : [],
    }));

    // Return only the basic game data, no detailed game data
    res.json(games); // Instead of calling fetchDetailedGames(games), we return the basic data
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games by tag", details: error.message });
  }
});


// Game details route
app.get("/api/game-details/:appid", async (req, res) => {
  try {
    const appid = req.params.appid;
    const gameDetails = await fetchSteamGameDetails(appid);
    res.json({
      short_description: gameDetails.short_description || "No description available",
      header_image: gameDetails.header_image || "No image available",
      ...gameDetails,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game details", details: error.message });
  }
});

// Endpoint to get all genres
app.get("/api/genres", (req, res) => {
  res.json(genreToMap); // Send the genre data
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
