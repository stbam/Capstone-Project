const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { fetchSteamGameDetails } = require('./steamApiHelper');
const genreToMap = require('./genreToMap');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Add all games to the database and save their details
app.get("/api/add-all-games", async (req, res) => {
    try {
        const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;
        const { data } = await axios.get(url);
        const appList = data.applist.apps;

        const results = appList.map(game => ({
            appid: game.appid,
            name: game.name,
        }));

        const uniqueResults = Array.from(new Map(results.map(item => [item.appid, item])).values());

        // Fetch and save details for each game
        const detailedResults = await Promise.all(uniqueResults.map(async (game) => {
            const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${game.appid}`;
            try {
                const { data: detailsData } = await axios.get(gameDetailsUrl);
                if (detailsData[game.appid]?.success) {
                    const gameDetails = detailsData[game.appid]?.data;
                    game.description = gameDetails?.short_description || "No description available.";

                    // Get genres for the game
                    const genres = gameDetails?.genres?.map(g => g.description) || [];
                    game.genres = genres;

                    // Save the genres into the Genre collection if not already there
                    for (const genreName of genres) {
                        let genre = await Genre.findOne({ name: genreName });
                        if (!genre) {
                            genre = new Genre({ name: genreName });
                            await genre.save();
                        }
                    }

                    // Save the game to the Game collection
                    let gameInDb = await Game.findOne({ appid: game.appid });
                    if (!gameInDb) {
                        const newGame = new Game({
                            appid: game.appid,
                            name: game.name,
                            description: game.description,
                            genres: await Genre.find({ name: { $in: genres } }).select('_id'),
                        });
                        await newGame.save();
                        console.log(`Game "${game.name}" saved to database.`);
                    }
                }
            } catch (error) {
                console.log(`Error fetching details for game ${game.appid}`);
            }
            return game;
        }));

        res.json({ message: "All games added to the database." });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch game data" });
    }
});

// Search for games by genre and name
app.get("/api/search/:query/genre/:genre", async (req, res) => {
    const query = req.params.query;
    const genreQuery = req.params.genre;

    try {
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

        const detailedResults = await Promise.all(uniqueResults.map(async (game) => {
            const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${game.appid}`;
            try {
                const { data: detailsData } = await axios.get(gameDetailsUrl);
                if (detailsData[game.appid]?.success) {
                    const gameDetails = detailsData[game.appid]?.data;
                    game.description = gameDetails?.short_description || "No description available.";

                    // Check if the game matches the genre dynamically
                    const genres = gameDetails?.genres?.map(g => g.description) || [];
                    game.genres = genres;
                    
                    // Check MongoDB for the genre, and insert if not found
                    let genre = await Genre.findOne({ name: genreQuery });
                    if (!genre) {
                        genre = new Genre({ name: genreQuery });
                        await genre.save();
                    }

                    // Create the game in the database if it doesn't exist
                    let gameInDb = await Game.findOne({ appid: game.appid });
                    if (!gameInDb) {
                        const newGame = new Game({
                            name: game.name,
                            description: game.description,
                            genre: genre._id
                        });
                        await newGame.save();
                        console.log(`Game "${game.name}" saved to database.`);
                    }
                }
            } catch (error) {
                game.description = "No description available.";
                console.log(`Error fetching details for game ${game.appid}`);
            }
            return game;
        }));

        const filteredResults = detailedResults.filter(game => game !== null);

        if (filteredResults.length > 0) {
            res.json(filteredResults);
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

app.get("/api/add-all-games", async (req, res) => {
    try {
        const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;
        const { data } = await axios.get(url);
        const appList = data.applist.apps;

        console.log(`Fetched ${appList.length} games from Steam.`); // Log the number of games fetched.

        const results = appList.map(game => ({
            appid: game.appid,
            name: game.name,
        }));

        const uniqueResults = Array.from(new Map(results.map(item => [item.appid, item])).values());

        console.log(`Found ${uniqueResults.length} unique games.`); // Log the number of unique games.

        const detailedResults = await Promise.all(uniqueResults.map(async (game) => {
            const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${game.appid}`;
            try {
                const { data: detailsData } = await axios.get(gameDetailsUrl);
                if (detailsData[game.appid]?.success) {
                    const gameDetails = detailsData[game.appid]?.data;
                    game.description = gameDetails?.short_description || "No description available.";
                    game.genres = gameDetails?.genres?.map(g => g.description) || [];
                    
                    console.log(`Fetched details for game ${game.name}`); // Log when details are fetched.

                    // Save the genres into the Genre collection if not already there
                    for (const genreName of game.genres) {
                        let genre = await Genre.findOne({ name: genreName });
                        if (!genre) {
                            genre = new Genre({ name: genreName });
                            await genre.save();
                        }
                    }

                    // Save the game to the Game collection
                    let gameInDb = await Game.findOne({ appid: game.appid });
                    if (!gameInDb) {
                        const newGame = new Game({
                            appid: game.appid,
                            name: game.name,
                            description: game.description,
                            genres: await Genre.find({ name: { $in: game.genres } }).select('_id'),
                        });
                        await newGame.save();
                        console.log(`Game "${game.name}" saved to database.`);
                    }
                }
            } catch (error) {
                console.log(`Error fetching details for game ${game.appid}`, error); // Log the error for each game.
                game.description = "No description available.";
            }
            return game;
        }));

        res.json({ message: "All games added to the database." });

    } catch (error) {
        console.log("Error occurred in /api/add-all-games:", error);
        res.status(500).json({ error: "Failed to fetch game data" });
    }
});


// Endpoint to get all genres
app.get("/api/genres", (req, res) => {
    res.json(genreToMap); // Send the genre data
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
