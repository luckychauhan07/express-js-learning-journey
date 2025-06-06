//EXTERNAL MODULES
const express = require("express");

//LOCAL MODULES
const storeController = require("../controls/storeController");

const userRouter = express.Router();
userRouter.get("/", storeController.getHomes);
module.exports = userRouter;

userRouter.get("/bookings", storeController.getBookings);

userRouter.get("/favourite", storeController.getFavouriteList);

userRouter.get("/reserve", storeController.getReserve);
