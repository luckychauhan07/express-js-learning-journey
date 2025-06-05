const favourite = require("../models/handleFavourite");
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
exports.postFavouriteList = (req, res, next) => {
    console.log(req.body.id);
    favourite.addToFavoruites(req.body.id);
    res.redirect("/favourite");
};
exports.getFavouriteList = (req, res, next) => {
    favourite.getFavourites((favouritesHomes) => {
        Home.fetchAll((registerHomes) => {
            const favouritesHomeDetails = favouritesHomes.map((homeId) =>
                registerHomes.find((home) => home.id === homeId)
            );
            res.render("store/favourite-list", { favouritesHomeDetails });
        });
    });
};
exports.getReserve = (req, res, next) => {
    res.render("store/reserve");
};
exports.getHomeList = (req, res, next) => {
    const registerHomes = Home.fetchAll((registerHomes) => {
        res.render("store/home-list", { registerHomes });
    });
};
exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    const selectedHome = Home.findHomeById(homeId, (home) => {
        res.render("store/home-details", { home });
    });
};
