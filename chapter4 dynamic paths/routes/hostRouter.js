//LOCAL MODULES
const hostController = require("../controls/hostController");

//EXTERNAL MODULES
const express = require("express");

const hostRouter = express.Router();
hostRouter.get("/contactUs", hostController.getAddHomes);

hostRouter.post("/contactUs", hostController.postAddHomes);
exports.hostRouter = hostRouter;

hostRouter.get("/edit-home", hostController.getEditHomes);

hostRouter.get("/host-home-list", hostController.getHostHomeList);
