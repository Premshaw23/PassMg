import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const port = 3000;
app.use(bodyParser.json())
app.use(cors());

let db; // To store the database connection globally
let client;
main(); 
async function main() {
  console.log(process.env.Mongo_URI);
   client = new MongoClient(process.env.Mongo_URI, {
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000, // 30 seconds
  });
  await client.connect();
  db = client.db("PassMg");
  console.log("Connected to MongoDB");
}

// Define routes
app.get("/", async (req, res) => {
  try {
    const collection = db.collection("Passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/", async (req, res) => { 
  try {
    const password = req.body;
    if (!password.site || !password.username || !password.password || !password.id) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }
    const collection = db.collection("Passwords");
    const insertResult = await collection.insertOne(password);
    res.send({ success: true, result: insertResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.delete("/", async (req, res) => {       
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Missing id field." });
    }
    const collection = db.collection("Passwords");
    const deleteResult = await collection.deleteOne({ id });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ success: false, error: "Password not found." });
    }
    res.send({ success: true, result: deleteResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
