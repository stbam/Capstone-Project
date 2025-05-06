const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({ path: "./config.env" });

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      console.log("Connecting to MongoDB...");
      await client.connect();
      database = client.db("test"); // Whatever string is in here is the database it works with
      console.log("Successfully connected to MongoDB");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      throw err;
    }
  },

  getDb: () => {
    if (!database) {
      console.error("Database is not initialized. Did you call connectToServer?");
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    console.log("Returning database instance");
    return database;
  }
};