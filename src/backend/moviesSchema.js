const mongoose = require("mongoose");

// Shared feature lists
const genres_list = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family",
  "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction",
  "Thriller", "TV Movie", "War", "Western"
];

const length_list = ["Less than 90 minutes", "90-120 minutes", "120-150 minutes", "Over 150 minutes", "No preference"];

const time_period_list = ["Before 1970", "1970-1980", "1990-2000", "2010-2020", "2020+", "No preference"];

const language_list = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Korean", "Portuguese", "Russian"];

// Movie schema
const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, unique: true, required: true }, // Add unique identifier for TMDB movies
  genres: { type: [String], required: true }, // List of genres
  language: { type: String, required: true }, // Original language
  runtime: { type: Number, required: true }, // Runtime in minutes
  release_date: { type: String, required: true }, // Release date as a string
  vector: {
    type: [Number], // One-hot encoded vector
    default: [], // Default to an empty array
  },
});

/*
// Pre-save middleware to compute the vector
movieSchema.pre("save", function (next) {
  const movie = this;

  // Compute genre vector
  const genre_vector = genres_list.map(genre => movie.genres.includes(genre) ? 1 : 0);

  // Compute runtime vector
  const length_vector = length_list.map(length => {
    if (movie.runtime < 90) return length === "Less than 90 minutes" ? 1 : 0;
    if (movie.runtime >= 90 && movie.runtime <= 120) return length === "90-120 minutes" ? 1 : 0;
    if (movie.runtime > 120 && movie.runtime <= 150) return length === "120-150 minutes" ? 1 : 0;
    if (movie.runtime > 150) return length === "Over 150 minutes" ? 1 : 0;
    return length === "No preference" ? 1 : 0;
  });

  // Compute release period vector
  const time_period_vector = time_period_list.map(period => {
    const release_year = parseInt(movie.release_date.split("-")[0]);
    if (release_year < 1970) return period === "Before 1970" ? 1 : 0;
    if (release_year >= 1970 && release_year < 1980) return period === "1970-1980" ? 1 : 0;
    if (release_year >= 1990 && release_year < 2000) return period === "1990-2000" ? 1 : 0;
    if (release_year >= 2010 && release_year < 2020) return period === "2010-2020" ? 1 : 0;
    if (release_year >= 2020) return period === "2020+" ? 1 : 0;
    return period === "No preference" ? 1 : 0;
  });

  // Compute language vector
  const language_vector = language_list.map(language => movie.language === language ? 1 : 0);

  // Combine all vectors
  movie.vector = [...genre_vector, ...length_vector, ...time_period_vector, ...language_vector];

  next();
});
*/

module.exports = mongoose.model("Movie", movieSchema);