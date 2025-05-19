const User = require("../models/UserSchema");

exports.GameAdd = async (req, res) => {
  try {
    console.log("game added");

    const { title, genre, description, userId, thumbnail, id } = req.body;
    console.log(`${userId} - user ID`);
    console.log(`${id} - game ID`);

    const newGame = {
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

    user.favorite_games.push(newGame); // 👈 update this based on your schema
    await user.save();

    res.status(200).json({ message: "Game added to favorites" });
  } catch (error) {
    console.error("Game error!", error);
    res.status(500).json({ error: "Failed to add game" });
  }
};

exports.getUserGame = async (req, res) => {
    
    try {
      const username = req.params.username;

  
      console.log("Fetching favorite games for:", username);
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user.favorite_games); // Send only favorite_games
    } catch (error) {
      console.error("Error fetching favorite games:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  