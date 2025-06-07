//EXTERNAL MODULES
const express = require("express");

//LOCAL MODULES
const storeController = require("../controls/storeController");

const userRouter = express.Router();
userRouter.get("/", storeController.getHomes);
module.exports = userRouter;

userRouter.get("/bookings", storeController.getBookings);

userRouter.post("/favourite", storeController.postFavouriteList);

userRouter.get("/favourite", storeController.getFavouriteList);

userRouter.get("/reserve", storeController.getReserve);

userRouter.get("/home-list", storeController.getHomeList);

userRouter.get("/home/:homeId", storeController.getHomeDetails);

userRouter.post(
    "/favourites/delete/:homeId",
    storeController.deleteFavouriteList
);
