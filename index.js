import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

import { entryRouter } from "./routes/entry.js";
import { moduleRouter } from "./routes/modules.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

let mongoURL = process.env.MONGO_URL;

export async function createConnection() {
  const client = new MongoClient(mongoURL);
  await client.connect();
  console.log("Mongo DB is connected.");
  return client;
}

createConnection();

const client = await createConnection();

app.get("/", async (req, res) => {
  res.send("Hello World");
});

// Login and Signup
app.use("/", entryRouter);
app.use("/module", moduleRouter);

app.listen(PORT, () =>
  console.log("The server has started in local host ", PORT)
);

export { client };
