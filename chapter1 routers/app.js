//EXTERNAL MODULES
const express = require("express");
const bodyParser = require("body-parser");

//LOCAL MODULES
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootpath = require("./utils/path");

//CORE MODULES
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);
app.get("/host-contactUs", (req, res, next) => {});
app.use((req, res, next) => {
    console.log(req.method, req.url);
    res.status(404).sendFile(path.join(rootpath, "views", "404Page.html"));
});
app.listen(3000, () => {
    console.log("the server is running at the port 3000");
});
