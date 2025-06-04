const Home = require("../models/home");
// exports.registerHomes = registerHomes;
exports.getHomes = (req, res, next) => {
    const registerHomes = Home.fetchAll((registerHomes) =>
        res.render("store/index", { registerHomes })
    );
    console.log(req.method, req.url, registerHomes);
};
exports.getBookings = (req, res, next) => {
    res.render("store/bookings");
};
exports.getFavouriteList = (req, res, next) => {
    res.render("store/favourite-list");
};
exports.getReserve = (req, res, next) => {
    res.render("store/reserve");
};
