const User = require("../models/UserSchema");

exports.getUserBook = async (req, res) => {
  try {
    const username = req.params.username;

    console.log("Fetching favorite books for:", username);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favorite_books); // Send only favorite_books
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
