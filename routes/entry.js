import express from "express";
import { signup, login } from "../helper/entryhelp.js";
import { encrypt, decrypt } from "../helper/crypt.js";
import { genId } from "../helper/generateId.js";

let router = express.Router();

router.post("/signup", async function (req, res, next) {
  let userData = req.body;

  delete userData.confirmPassword;
  let pwd = userData.password;

  let hashedPwd = await encrypt(pwd);
  let idDetails = await genId("User");

  let running = idDetails.runningNumber;
  let rangeStart = idDetails.rangeStart;
  let rangeEnd = idDetails.rangeEnd;
  let prefix = idDetails.prefix;

  let inc = parseInt(running) + 1;

  if (inc > rangeStart && inc < rangeEnd) {
    let newId = `${prefix}-${inc}`;

    userData.id = newId;
    userData.password = hashedPwd;

    let signupStatus = await signup(userData);

    res.send(signupStatus);
  } else {
    res.send({ message: "Id is out of Range" });
  }
});

router.post("/login", async function (req, res, next) {
  let userData = req.body;
  let email = userData.email;
  let pwd = userData.password;

  let storedUserData = await login(email);

  let hashedPassword = storedUserData?.password;

  if (hashedPassword != undefined) {
    let comparePassword = await decrypt(pwd, hashedPassword);

    if (comparePassword == true) {
      res.send(comparePassword);
    } else {
      res.sendStatus("403");
    }
  } else {
    res.sendStatus("403");
  }
});

export const entryRouter = router;
