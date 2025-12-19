const jwt = require('jsonwebtoken');
const SECRET_KEY = "123";
const { MongoClient } = require('mongodb');

function stuidRoutes(app) {
  app.post("/verify-class", async (req, res) => {
    try {
      const { classId } = req.body;

      const url = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(url);
      await client.connect();

      const db = client.db("mernpro");
      const collection = db.collection("classid");

      const classFound = await collection.findOne({ classId });

      if (classFound) {
        const token = jwt.sign({}, SECRET_KEY);
        res.json({ studentprogress: "successfully", token, status: "successful" });
      } else {
        res.status(404).json({ status: "failed", message: "Invalid Class ID" });
      }

      await client.close();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error verifying class");
    }
  });
}

module.exports = stuidRoutes;
