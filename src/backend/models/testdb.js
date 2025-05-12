const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://GabrielD:38Xk2D3QfHFmlKuj@projectdata.3z34y.mongodb.net/test?retryWrites=true&w=majority&appName=projectData", {
  serverSelectionTimeoutMS: 5000, // Set timeout to 5 seconds
})
  .then(async () => {
    console.log("Connected to MongoDB");

    const movieSchema = new mongoose.Schema({
      tmdb_id: { type: Number, unique: true, required: true },
      genres: { type: [String], required: true },
      language: { type: String, required: true },
      runtime: { type: Number, required: true },
      release_date: { type: String, required: true },
    });

    const Movie = mongoose.model("Movie", movieSchema);

    // Test insertOne operation
    const newMovie = new Movie({
      tmdb_id: 550,
      genres: ["Drama"],
      language: "en",
      runtime: 139,
      release_date: "1999-10-15",
    });

    const savedMovie = await newMovie.save();
    console.log("Saved movie:", savedMovie);

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB or saving movie:", error);
    mongoose.connection.close();
  });