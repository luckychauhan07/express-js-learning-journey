// CORE MODULES
const express = require("express");

// LOCAL MODULLES
const authController = require("../controls/authController");

const authRouter = express.Router();

authRouter.get("/login", authController.getLogin);

authRouter.post("/login", authController.postLogin);

authRouter.post("/logout", authController.postLogout);

exports.authRouter = authRouter;
