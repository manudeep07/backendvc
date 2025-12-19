const jwt = require('jsonwebtoken');
const SECRET_KEY = "123";
const { MongoClient } = require('mongodb');
function loginRoutes(app) {
  app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const url = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(url);
      await client.connect();

      const db = client.db("mernpro");
      const collection = db.collection("signupdata");

      const user = await collection.findOne({ username, password });

      if (user) {
        const token = jwt.sign({ username }, SECRET_KEY);
        res.json({ token, username });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }

      await client.close();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error logging in");
    }
  });
}

module.exports = loginRoutes;
