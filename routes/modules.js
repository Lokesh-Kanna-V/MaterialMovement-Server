import express from "express";
import { getAllModules } from "../helper/moduleshelp.js";

let router = express.Router();

router.get("/getAllModules", async function (req, res, next) {
  let allModules = await getAllModules();
  res.send(allModules);
});

export const moduleRouter = router;
