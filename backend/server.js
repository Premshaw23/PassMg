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

const dbName = "PassMg";
let db; // To store the database connection globally
let client;
main(); 
async function main() {
   client = new MongoClient(process.env.Mongo_URI, {
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000, // 30 seconds
  });
  await client.connect();
  db = client.db(dbName);
  console.log("Connected to MongoDB");
}

// Define routes
app.get("/", async (req, res) => {
  const collection = db.collection("Passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
  console.log("done");
});
app.post("/", async (req, res) => { 
    const password = req.body;
    const collection = db.collection("Passwords");
    const findResult = await collection.insertOne(password);
    res.send({ success: true,result:findResult});
    console.log("POST request processed");
});
app.delete("/", async (req, res) => {       
  const password = req.body;
  const collection = db.collection("Passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
  console.log("delete request processed");
  console.log("dhj");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
