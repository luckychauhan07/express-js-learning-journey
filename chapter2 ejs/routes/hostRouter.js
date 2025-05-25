//LOCAL MODULES
const rootpath = require("../utils/path");

//EXTERNAL MODULES
const express = require("express");

//CORE MODULES
const path = require("path");

const hostRouter = express.Router();
hostRouter.get("/contactUs", (req, res, next) => {
    res.sendFile(path.join(rootpath, "views", "homeRegister.html"));
});
hostRouter.post("/contactUs", (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(rootpath, "views", "success.html"));
});
module.exports = hostRouter;
