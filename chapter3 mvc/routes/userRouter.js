//EXTERNAL MODULES
const express = require("express");

//LOCAL MODULES
const homesControler = require("../controls/homes");

const userRouter = express.Router();
userRouter.get("/", homesControler.getHomes);
module.exports = userRouter;
