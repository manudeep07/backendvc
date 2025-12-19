const jwt = require('jsonwebtoken');
const SECRET_KEY = "123";
const { MongoClient } = require('mongodb');

function teaidRoutes(app) {
  app.post("/create-class", async (req, res) => {
    try {
      const { classId } = req.body;

      const url = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(url);
      await client.connect();

      const db = client.db("mernpro");
      const collection = db.collection("classid");

      await collection.insertOne({ classId });

      const token = jwt.sign({}, SECRET_KEY);

      res.json({ teacherprogress: "successful", token, status: "successful" });

      await client.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ teacherprogress: "failed" });
    }
  });
}

module.exports = teaidRoutes;
