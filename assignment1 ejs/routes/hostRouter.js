//LOCAL MODULES
const rootpath = require("../utils/path");

//EXTERNAL MODULES
const express = require("express");

//CORE MODULES
const path = require("path");

const hostRouter = express.Router();
hostRouter.get("/contactUs", (req, res, next) => {
    res.render("homeRegister");
});
const registerHomes = [];
hostRouter.post("/contactUs", (req, res, next) => {
    console.log(req.body, req.body.houseName);
    registerHomes.push({
        houseName: req.body.houseName,
        charge: req.body.chargePerNight,
        location: req.body.location,
        rating: req.body.rating,
        imageUrl: req.body.imageUrl,
    });
    res.render("success");
});
exports.hostRouter = hostRouter;
exports.registerHomes = registerHomes;
