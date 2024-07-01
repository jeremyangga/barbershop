const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://mongo:jeje_mongo@cluster0.cuoltyf.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connect() {
  try {
    const database = client.db("final_project");
    db = database;
    return database;
  } catch (err) {
    console.log(err);
  }
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };
