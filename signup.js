const express = require('express');
const cors = require('cors');

const loginRoutes = require('./login.js');
const stuidRoutes = require('./stuid.js');
const teaidRoutes = require('./teaid.js');
const initSocket = require('./socket.js');

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
loginRoutes(app);
stuidRoutes(app);
teaidRoutes(app);

// Signup route directly in main file
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const { MongoClient } = require('mongodb');
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("mernpro");
    const collection = db.collection("signupdata");

    await collection.insertOne({ username, password, email });
    res.json({ message: "Signup successful" });

    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up");
  }
});

// Start server
const server = app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Initialize socket.io

