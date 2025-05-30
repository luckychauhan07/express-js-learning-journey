const Home = require("../models/home");
exports.getAddHomes = (req, res, next) => {
    res.render("homeRegister");
};

exports.postAddHomes = (req, res, next) => {
    console.log(req.body, req.body.houseName);
    const { houseName, chargePerNight, location, rating, imageUrl } = req.body;
    const home = new Home(
        houseName,
        chargePerNight,
        location,
        rating,
        imageUrl
    );
    home.save();
    res.render("success");
};
// exports.registerHomes = registerHomes;
exports.getHomes = (req, res, next) => {
    const registerHomes = Home.fetchAll((registerHomes) =>
        res.render("welcome", { registerHomes })
    );
    console.log(req.method, req.url, registerHomes);
};
