/* THIS IS THE BACKEND FOR TMDB API TEST PAGE */

require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5002;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Middleware
app.use(cors());
app.use(express.json());

if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is not set in the environment variables");
    process.exit(1);
}

// Helper function to make requests to TMDB
const tmdbRequest = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/${endpoint}`, {
            params: { api_key: TMDB_API_KEY, ...params },
        });
        return response.data;
    } catch (error) {
        console.error("TMDB API error:", error.message);
        return null;
    }
};

// Search movies by name
app.get("/search", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const data = await tmdbRequest("search/movie", { query });
    if (data) {
        res.json({ results: data.results });
    } else {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

// Search movies by genre
app.get("/genre", async (req, res) => {
    const { genreId } = req.query;
    if (!genreId || isNaN(genreId)) {
        return res.status(400).json({ error: "Valid genre ID is required" });
    }

    const data = await tmdbRequest("discover/movie", { with_genres: genreId });
    if (data) {
        res.json({ results: data.results });
    } else {
        res.status(500).json({ error: "Failed to fetch movies by genre" });
    }
});

// Fetch all genres
app.get("/genres", async (req, res) => {
    const data = await tmdbRequest("genre/movie/list");
    if (data) {
        res.json({ genres: data.genres });
    } else {
        res.status(500).json({ error: "Failed to fetch genres" });
    }
});

// Fetch movie poster URL
app.get("/poster", (req, res) => {
    const { path } = req.query;
    if (!path) return res.status(400).json({ error: "Poster path is required" });

    const posterUrl = `https://image.tmdb.org/t/p/original${path}`;
    res.json({ posterUrl });
});

// Fetch movie details by ID
app.get("/movie/:id", async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Valid movie ID is required" });
    }

    const data = await tmdbRequest(`movie/${id}`);
    if (data) {
        res.json(data); // Returning detailed movie data
    } else {
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
});

// Start server
app.listen(PORT, () => console.log(`TMDB API server running on port ${PORT}`));
