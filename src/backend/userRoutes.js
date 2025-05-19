const express = require("express")
const database = require('./connect');
const ObjectId = require("mongodb").ObjectId

let userRoutes = express.Router()

//1 - Retrieve All
//http://localhost:3000/users
userRoutes.route("/users").get(async (request, response) => {

  let db = database.getDb()
  console.log("here is db", db)
  //calling an empty object to show all users
  let data = await db.collection("users").find({}).toArray()

  if(data.length > 0){
    response.json(data)
  } else {
    throw new Error("Data was not found :( ")
  }
})

//2 - Retrieve One
userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();
  console.log(db+"here is db")
  console.log("Fetching user by ID:", request.params.id);

  let data;
  try {
    data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) });
  } catch (err) {
    console.error("Error querying MongoDB:", err);
    return response.status(500).json({ error: "Invalid ID format or DB error" });
  }

  console.log("Result from DB:", data);

  if (data) {
    response.json(data);
  } else {
    response.status(404).json({ error: "User not found" });
  }
});


//3 - Create One
userRoutes.route("/users").post(async (request, response) => {

  let db = database.getDb()
  let mongoObject = {
    username: request.body.username,
    password: request.body.password
  }

  //Finding one user
  let data = await db.collection("users").insertOne(mongoObject)

  response.json(data)
})

//4 - Update One
userRoutes.route("/users/:id").put(async (request, response) => {

  let db = database.getDb()
  let mongoObject = {
    $set: {
      username: request.body.username,
      password: request.body.password
    }
  }

  //Finding one user
  let data = await db.collection("users").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)

  response.json(data)
})

//5 - Delete One 
userRoutes.route("/users/:id").delete(async (request, response) => {

  let db = database.getDb()
  //Finding one user
  let data = await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)})

  response.json(data)
})

// 6 - PATCH /users/:id/survey-completed
// Updates the user to mark the survey as completed
userRoutes.patch("/users/:id/survey-completed", async (req, res) => {
  try {
    let db = database.getDb();
    const userId = req.params.id;

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { hasCompletedSurvey: true } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Survey marked as completed." });
    } else {
      res.status(404).json({ error: "User not found or already updated." });
    }
  } catch (error) {
    console.error("Error updating survey status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userRoutes 