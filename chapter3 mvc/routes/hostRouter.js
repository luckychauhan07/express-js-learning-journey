//LOCAL MODULES
const homesControler = require("../controls/homes");

//EXTERNAL MODULES
const express = require("express");

const hostRouter = express.Router();
hostRouter.get("/contactUs", homesControler.getAddHomes);

hostRouter.post("/contactUs", homesControler.postAddHomes);
exports.hostRouter = hostRouter;
