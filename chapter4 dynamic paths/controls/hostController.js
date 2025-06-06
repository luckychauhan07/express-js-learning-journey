const Home = require("../models/home");
exports.getAddHomes = (req, res, next) => {
    res.render("host/homeRegister", {
        editing: false,
        pageTitle: "register",
    });
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
    const editing = req.query.editing;
    const homeId = req.params.id;
    Home.findHomeById(homeId, (editHome) => {
        res.render("host/homeRegister", {
            editing: editing,
            pageTitle: "edit ",
            editHome: editHome,
        });
    });
};
exports.getHostHomeList = (req, res, next) => {
    const registerHomes = Home.fetchAll((registerHomes) => {
        res.render("host/host-home-list", { registerHomes });
    });
};

exports.postEditHome = (req, res, next) => {
    const { houseName, chargePerNight, location, rating, imageUrl, homeId } =
        req.body;
    const home = new Home(
        houseName,
        chargePerNight,
        location,
        rating,
        imageUrl
    );
    home.id = homeId;
    home.save();
    res.redirect("/host/host-home-list");
};
