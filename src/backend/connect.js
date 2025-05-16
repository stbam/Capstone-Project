
// connect.js
const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGO_URI)
      .then(client => {
        dbConnection = client.db();
        return cb();
      })
      .catch(err => {
        console.error(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection
  
};




/*
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/