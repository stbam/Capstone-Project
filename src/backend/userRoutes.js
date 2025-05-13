const express = require("express");
const User = require("./models/userSchema"); // Mongoose model

const userRoutes = express.Router();

// 1 - Retrieve All Users
userRoutes.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// 2 - Retrieve One User by ID
userRoutes.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

// 3 - Create One User (for testing)
userRoutes.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({
      username,
      password,
      isNewUser: true
    });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// 4 - Update One User
userRoutes.put("/users/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// 5 - Delete One User
userRoutes.delete("/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// 6 - Mark User as Not New (used after survey submission)
userRoutes.patch("/users/:id/not-new", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.params.id,
      { isNewUser: false },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User marked as not new", user: result });
  } catch (error) {
    console.error("Error updating isNewUser:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = userRoutes;
