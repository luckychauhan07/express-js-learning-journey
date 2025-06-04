const Home = require("../models/home");
exports.getAddHomes = (req, res, next) => {
    res.render("host/homeRegister");
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
    res.render("host/success");
};
exports.getEditHomes = (req, res, next) => {
    res.render("host/edit-home");
};
exports.getHostHomeList = (req, res, next) => {
    const registerHomes = Home.fetchAll((registerHomes) => {
        res.render("host/host-home-list", { registerHomes });
    });
};
