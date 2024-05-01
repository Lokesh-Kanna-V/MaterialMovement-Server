import { client } from "../index.js";

async function getAllModules() {
  const allModules = await client
    .db("Project-001")
    .collection("ModuleMasterData")
    .find({})
    .toArray();
  return allModules;
}

export { getAllModules };
