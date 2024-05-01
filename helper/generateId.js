import { client } from "../index.js";

async function genId(filter) {
  const newID = await client
    .db("Project-001")
    .collection("NumberRangeMasterData")
    .findOne({ idType: filter });
  return newID;
}

export { genId };
