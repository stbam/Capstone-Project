/* THIS IS THE BACKEND FOR TMDB API TEST PAGE */
const mongoose = require("mongoose");
const { buildMovieVector, genresList } = require('./vectorUtil'); 
require("dotenv").config({ path: "./backend/config.env" });

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { exec } = require("child_process");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 5002;
const TMDB_API_KEY = "9acc16caf27143a749376727fd222dc6"; // process.env.TMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const lengthList = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"];
const timePeriodList = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"];
const languageList = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"];

const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

const movieSchema = new mongoose.Schema({
    tmdb_id: Number,
    title: String,
    genres: [String],
    language: String,
    runtime: Number,
    release_date: String,
    vector: [Number], //for one-hot/cosine similarity
    poster_path: String
});

const Movie = mongoose.model("Movie", movieSchema);


console.log("MongoDB URI:", process.env.MONGO_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

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
    console.log(`POSTER ENDPOINT BEING CALLED WITH ORIGINAL IMAGES: ${path} `);
    const posterUrl = `https://image.tmdb.org/t/p/original${path}`;
    res.json({ posterUrl });
});

// Fetch movie details by ID
app.get("/movie/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching movie details for ID: ${id}`);

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Valid movie ID is required" });
    }

    const data = await tmdbRequest(`movie/${id}`);
    if (data) {
        res.json({
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            poster_path: data.poster_path,
            genres: data.genres.map((genre) => genre.name),
            budget: data.budget,
            revenue: data.revenue,
            runtime: data.runtime,
            tagline: data.tagline,
            imdb_id: data.imdb_id,
        });
    } else {
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
});

// Fetch movie images by ID
app.get("/movie/:id/images", async (req, res) => {
    const { id } = req.params;
    console.log(`ORIGINAL IMAGE ENDPOINT CALLED USING ID: ${id}`);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Valid movie ID is required" });
    }

    const data = await tmdbRequest(`movie/${id}/images`);
    if (data) {
        res.json(data); // Return movie images data
    } else {
        res.status(500).json({ error: "Failed to fetch movie images" });
    }
});

app.get("/movie/:id/credits", async (req, res) => {
    const {id} = req.params;
    console.log(`credits called with id: ${id}`);
    if(!id || isNaN(id)){
        return res.status(400).json({error: "Valid movie ID is required"});
    }
    const data = await tmdbRequest(`movie/${id}/credits`);
    if(data){
        res.json(data);
    } else{
        res.status(500).json({error: "Failed to fetch movie credits"});
    }
})

const genres = require('./movieGenres');

// Example route to fetch genres (if needed)
app.get("/genres", (req, res) => {
    res.json({ genres });
});

// Handle movie interaction from frontend
app.post("/movie-interaction", (req, res) => {
    const movieData = req.body;
    console.log("Received movie interaction data:", movieData);

    // Here you can do something with the data, like save to a DB or log analytics
    res.status(200).json({ message: "Movie data received successfully." });
});

// Function to print the movie vector and corresponding genre names
function printMovieVectorWithLabels(movieVector, genresList, lengthList, timePeriodList, languageList) {
    console.log("\nMovie Vector Breakdown:");

    // Genres
    console.log("Genres:");
    genresList.forEach((genre, index) => {
        console.log(`${genre}: ${movieVector[index]}`);
    });

    // Length
    console.log("\nMovie Length:");
    lengthList.forEach((length, index) => {
        console.log(`${length}: ${movieVector[genresList.length + index]}`);
    });

    // Time Period
    console.log("\nTime Period:");
    timePeriodList.forEach((period, index) => {
        console.log(`${period}: ${movieVector[genresList.length + lengthList.length + index]}`);
    });

    // Language
    console.log("\nLanguage:");
    languageList.forEach((language, index) => {
        console.log(`${language}: ${movieVector[genresList.length + lengthList.length + timePeriodList.length + index]}`);
    });
}

// Fetch and store movies from TMDB
app.post("/fetch-and-store-movies", async (req, res) => {
    try {
        const totalPagesToFetch = 40; // Adjust this number to fetch more or fewer pages
        const savedMovies = [];

        for (let page = 1; page <= totalPagesToFetch; page++) {
            const response = await tmdbRequest("movie/popular", {
                language: "en-US",
                page: page,
            });

            if (!response || !response.results) {
                console.warn(`Skipping page ${page} due to missing results.`);
                continue;
            }

            const movies = response.results;

            for (const movie of movies) {
                await new Promise(resolve => setTimeout(resolve, 300)); // 300ms delay between detailed requests
                const detailedResponse = await tmdbRequest(`movie/${movie.id}`, {
                    language: "en-US",
                });

                if (!detailedResponse) continue;

                // Check for duplicates in DB
                const exists = await Movie.findOne({ tmdb_id: movie.id });
                if (exists) {
                    console.log(`Skipping duplicate movie: ${movie.original_title} (tmdb_id: ${movie.id})`);
                    continue;
                }

                const genreNames = detailedResponse.genres.map(genre => mapGenreIdToName(genre.id));

                const movieVector = buildMovieVector({
                    runtime: detailedResponse.runtime,
                    genres: detailedResponse.genres,
                    release_date: detailedResponse.release_date,
                    language: detailedResponse.original_language,
                    poster_path: movie.poster_path || detailedResponse.poster_path || null,
                });

                printMovieVectorWithLabels(movieVector, genresList, lengthList, timePeriodList, languageList);

                const newMovie = new Movie({
                    tmdb_id: movie.id,
                    title: movie.original_title,
                    genres: genreNames,
                    language: movie.original_language,
                    runtime: detailedResponse.runtime || 120,
                    release_date: movie.release_date,
                    vector: movieVector,
                    poster_path: movie.poster_path || detailedResponse.poster_path || null,
                });

                const savedMovie = await newMovie.save();
                savedMovies.push(savedMovie);
            }
        }

        res.status(200).json({
            message: `Successfully fetched, processed, and stored ${savedMovies.length} movies.`,
            movies: savedMovies,
        });
    } catch (error) {
        console.error("Error fetching or storing movies:", error);
        res.status(500).json({ error: "Failed to fetch and store movies" });
    }
});




app.post("/fetch-and-store-movie", async (req, res) => {
    const { movie_id } = req.body; // Get the movie ID from the request body

    if (!movie_id) {
        return res.status(400).json({ error: "Movie ID is required" });
    }

    try {
        // Fetch the movie details from TMDB
        const movie = await tmdbRequest(`movie/${movie_id}`);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Map TMDB data to your schema
        const movieData = {
            tmdb_id: movie.id, // Add the TMDB movie ID
            title: movie.original_title,
            genres: movie.genres.map(genre => genre.name), // Use genre names
            language: movie.original_language,
            runtime: movie.runtime || 120, // Default runtime if not available
            release_date: movie.release_date,
        };

        console.log("Movie data to be saved:", movieData); // Log the movie data

        // Save the movie to the database
        const newMovie = new Movie(movieData);
        const savedMovie = await newMovie.save();

        res.status(200).json({
            message: "Movie fetched and stored successfully.",
            movie: savedMovie,
        });
    } catch (error) {
        console.error("Error fetching or storing movie:", error); // Log the full error
        res.status(500).json({ error: "Failed to fetch and store movie", details: error.message });
    }
});

// Get all movies with their vectors from the database
app.get("/movie-vectors", async (req, res) => {
    try {
        const movies = await Movie.find({}, { _id: 0, tmdb_id: 1, title: 1, vector: 1 });
        res.json(movies);
    } catch (error) {
        console.error("Error fetching movie vectors:", error);
        res.status(500).json({ error: "Failed to fetch movie vectors" });
    }
});

// Get a single movie vector by tmdb_id
app.get("/movie/:id/vector", async (req, res) => {
    try {
        const movie = await Movie.findOne({ tmdb_id: parseInt(req.params.id) }, { _id: 0, title: 1, vector: 1 });
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (error) {
        console.error("Error fetching movie vector:", error);
        res.status(500).json({ error: "Failed to fetch movie vector" });
    }
});

// Recommendation endpoint
app.get("/recommendations", async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        // Step 1: Get user vector by calling onehot.py
        const userVector = await getUserVectorFromPython(userId);

        // Step 2: Fetch movies with vectors (only needed fields)
        const movies = await Movie.find({}, {
            _id: 0,
            tmdb_id: 1,
            title: 1,
            vector: 1,
            poster_path: 1,
            genres: 1,
            release_date: 1,
            language: 1,
            runtime: 1
        });

        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: "No movies found for recommendations" });
        }

        // Step 3: Compute cosine similarity for each movie
        const similarities = movies.map(movie => {
            const similarity = calculateCosineSimilarity(userVector, movie.vector);
            return {
                tmdb_id: movie.tmdb_id,
                title: movie.title,
                similarity,
                poster_path: movie.poster_path || null,
                genres: movie.genres || [],
                release_date: movie.release_date || null,
                language: movie.language || null,
                runtime: movie.runtime || null
            };
        });

        // Step 4: Sort and select top N
        similarities.sort((a, b) => b.similarity - a.similarity);
        const topRecommendations = similarities.slice(0, 20); // Change 20 if you want fewer

        // Step 5: Send enriched recommendations
        res.json({ recommendations: topRecommendations });

    } catch (error) {
        console.error("Error generating recommendations:", error);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
});




// Cosine similarity function
function calculateCosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        magnitudeA += vecA[i] * vecA[i];
        magnitudeB += vecB[i] * vecB[i];
    }

    const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

    if (magnitude === 0) {
        return 0; // Prevent division by zero
    }

    return dotProduct / magnitude;
}

function getUserVectorFromPython(userId) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, "onehot.py");

        exec(`python3 ${scriptPath} ${userId}`, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing onehot.py:", stderr);
                return reject(error);
            }

            try {
                const vector = JSON.parse(stdout.trim());
                resolve(vector);
            } catch (parseError) {
                console.error("Failed to parse vector output:", stdout);
                reject(parseError);
            }
        });
    });
}




// Helper function to map TMDB genre IDs to names
function mapGenreIdToName(id) {
    const genreMap = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
  
    return genreMap[id] || "Unknown"; // Return "Unknown" if the ID is not in the map
  }

// Start server
app.listen(PORT, () => console.log(`TMDB API server running on port ${PORT}`));
