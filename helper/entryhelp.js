import { client } from "../index.js";

async function signup(userData) {
  const userCreated = await client
    .db("Project-001")
    .collection("UserMasterData")
    .insertOne(userData);
  return userCreated;
}

async function login(email) {
  const userData = await client
    .db("Project-001")
    .collection("UserMasterData")
    .findOne({ email: email });
  return userData;
}

export { signup, login };
