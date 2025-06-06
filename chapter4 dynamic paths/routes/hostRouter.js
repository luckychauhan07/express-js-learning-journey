//LOCAL MODULES
const hostController = require("../controls/hostController");

//EXTERNAL MODULES
const express = require("express");

const hostRouter = express.Router();
hostRouter.get("/registerHome", hostController.getAddHomes);

hostRouter.post("/registerHome", hostController.postAddHomes);
exports.hostRouter = hostRouter;

hostRouter.get("/edit-home/:id", hostController.getEditHomes);

hostRouter.get("/host-home-list", hostController.getHostHomeList);

hostRouter.post("/editHome", hostController.postEditHome);
