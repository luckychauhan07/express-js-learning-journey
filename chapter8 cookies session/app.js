//EXTERNAL MODULES
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//LOCAL MODULES
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const { authRouter } = require("./routes/authRouter");
const errorController = require("./controls/error");

//CORE MODULES
const path = require("path");
const { default: mongoose } = require("mongoose");

const app = express();

const DB_PATH =
	"mongodb+srv://chauhan12lucky:lucky%40123@luckychauhan.kmadz3u.mongodb.net/airbnb?retryWrites=true&w=majority";

const store = new MongoDBStore({
	uri: DB_PATH,
	collection: "sessions",
});
store.on("error", function (error) {
	console.log("❌ Session Store Error:", error);
});

//this is setup the ejs
app.set("view engine", "ejs");
app.set("views", "views");

//

//this middleware is used for parsing the request body
app.use(bodyParser.urlencoded({ extended: false }));

// session middleware
app.use(
	session({
		// secret is used to sign the session ID cookie and encrpyt session data
		secret: "lucky chauhan",
		// forces session to be saved back to the session Store,even if not modified
		resave: false,
		// forces a session that is Uninitialized to be saved to the store
		saveUninitialized: true,
		store: store,
	})
);

//pulic the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	req.isLoggedIn = req.session.isLoggedIn;
	next();
});
app.use(authRouter);

// app.use("/", (req, res, next) => {
// 	if (req.isLoggedIn) {
// 		return next();
// 	} else {
// 		res.redirect("/login");
// 	}
// });
app.use(userRouter);
app.use("/host", (req, res, next) => {
	if (req.isLoggedIn) {
		return next();
	} else {
		res.redirect("/login");
	}
});
app.use("/host", hostRouter);

app.use(errorController.pageNotFound);

mongoose
	.connect(
		"mongodb+srv://chauhan12lucky:lucky%40123@luckychauhan.kmadz3u.mongodb.net/airbnb?retryWrites=true&w=majority&appName=luckychauhan"
	)
	.then(() => {
		console.log("connection with mongoose is successfull");
		app.listen(3000, () => {
			console.log("the server is running at the port 3000");
		});
	})
	.catch((err) => {
		console.log("connection with mongoose is not correct", err);
	});
