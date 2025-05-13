const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId

let userRoutes = express.Router()

// 1 - Retrieve All
userRoutes.route("/users").get(async (request, response) => {
  let db = database.getDb()
  let data = await db.collection("users").find({}).toArray()
  if (data.length > 0) {
    response.json(data)
  } else {
    throw new Error("Data was not found :( ")
  }
})

// 2 - Retrieve One
userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb()
  let data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) })
  if (data && Object.keys(data).length > 0) {
    response.json(data)
  } else {
    throw new Error("Data was not found :( ")
  }
})

// 3 - Create One
userRoutes.route("/users").post(async (request, response) => {
  let db = database.getDb()
  let mongoObject = {
    username: request.body.username,
    password: request.body.password,
    isNewUser: true  // default when creating a new user
  }
  let data = await db.collection("users").insertOne(mongoObject)
  response.json(data)
})

// 4 - Update One
userRoutes.route("/users/:id").put(async (request, response) => {
  let db = database.getDb()
  let mongoObject = {
    $set: {
      username: request.body.username,
      password: request.body.password
    }
  }
  let data = await db.collection("users").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject)
  response.json(data)
})

// 5 - Delete One
userRoutes.route("/users/:id").delete(async (request, response) => {
  let db = database.getDb()
  let data = await db.collection("users").deleteOne({ _id: new ObjectId(request.params.id) })
  response.json(data)
})

// ✅ 6 - Mark user as not new (after survey is submitted)
userRoutes.route("/users/:id/complete-survey").patch(async (request, response) => {
  try {
    let db = database.getDb()
    let updateResult = await db.collection("users").updateOne(
      { _id: new ObjectId(request.params.id) },
      { $set: { isNewUser: false } }
    )
    if (updateResult.matchedCount === 0) {
      return response.status(404).send("User not found")
    }
    response.send({ message: "User marked as returning", result: updateResult })
  } catch (err) {
    response.status(500).send("Error updating user")
  }
})

// ✅ 7 - Sign in and return isNewUser status
userRoutes.route("/signin").post(async (request, response) => {
  try {
    let db = database.getDb();
    const { username, password } = request.body;

    const user = await db.collection("users").findOne({ username, password });

    if (!user) {
      return response.status(401).json({ error: "Invalid credentials" });
    }

    response.status(200).json({
      message: "Sign-in successful.",
      userId: user._id,
      isNewUser: user.isNewUser, // ✅ include this
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    response.status(500).json({ error: "Sign-in failed" });
  }
});

module.exports = userRoutes
