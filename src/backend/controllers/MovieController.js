const User = require("../models/UserSchema");

exports.MovieAdd = async (req, res) => {
  try {
    console.log("movie added");

    const { title, genre, description, userId, thumbnail, id } = req.body;
    console.log(`${userId} - user ID`);
    console.log(`${id} - movie ID`);

    const newMovie = {
      title,
      genre,
      description,
      thumbnail,
      id,
    };

    const user = await User.findById(userId); // Make sure userId is a valid MongoDB _id

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorite_movies.push(newMovie); // 👈 update this based on your schema
    await user.save();

    res.status(200).json({ message: "Movie added to favorites" });
  } catch (error) {
    console.error("Movie error!", error);
    res.status(500).json({ error: "Failed to add movie" });
  }
};

exports.getUserMovie = async (req, res) => {
    
    try {
      const username = req.params.username;

  
      console.log("Fetching favorite movies for:", username);
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user.favorite_movies); // Send only favorite_movies
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  