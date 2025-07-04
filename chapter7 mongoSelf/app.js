//EXTERNAL MODULES
const express = require("express");
const bodyParser = require("body-parser");

//LOCAL MODULES
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const errorController = require("./controls/error");

//CORE MODULES
const path = require("path");
const { error } = require("console");
const { mongoConnect } = require("./utils/databaseUtil");

const app = express();

//this is setup the ejs
app.set("view engine", "ejs");
app.set("views", "views");

//this middleware is used for parsing the request body
app.use(bodyParser.urlencoded());
//pulic the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(userRouter);
app.use("/host", hostRouter);
// app.get("/host-contactUs", (req, res, next) => {});
app.use(errorController.pageNotFound);

mongoConnect(() => {
	app.listen(3000, () => {
		// console.log(client);
		console.log("the server is running at the port 3000");
	});
});
