//CORE MODULES
const path = require("path");

//EXTERNAL MODULES
const express = require("express");

//LOCAL MODULES
const rootpath = require("../utils/path");
const { registerHomes } = require("./hostRouter");

const userRouter = express.Router();
userRouter.get("/", (req, res, next) => {
    console.log(req.method, req.url, registerHomes);
    // res.sendFile(path.join(rootpath, "views", "welcome.html"));
    res.render("welcome", { registerHomes });
});
module.exports = userRouter;
