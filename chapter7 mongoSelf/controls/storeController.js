const favourite = require("../models/handleFavourite");
const Home = require("../models/home");
// exports.registerHomes = registerHomes;
exports.getHomes = (req, res, next) => {
	Home.fetchAll().then((registerHomes) => {
		res.render("store/index", { registerHomes });
	});
	console.log(req.method, req.url);
};
exports.getBookings = (req, res, next) => {
	res.render("store/bookings");
};
exports.postFavouriteList = async (req, res, next) => {
	const homeID = req.body.id;
	try {
		await favourite.saveFavourite(homeID);
		console.log("the home is added to the favourite");
		res.redirect("/favourite");
	} catch (err) {
		console.error("Error adding to favourites:", err.message);
	}
};
exports.getFavouriteList = (req, res, next) => {
	favourite.getFavourites().then((favouritesHomeDetails) => {
		res.render("store/favourite-list", { favouritesHomeDetails });
	});
};
exports.getReserve = (req, res, next) => {
	res.render("store/reserve");
};
exports.getHomeList = (req, res, next) => {
	Home.fetchAll().then((registerHomes) => {
		res.render("store/home-list", { registerHomes });
	});
};
exports.getHomeDetails = (req, res, next) => {
	const homeId = req.params.homeId;
	console.log(homeId);
	Home.findHomeById(homeId).then((home) => {
		res.render("store/home-details", { home });
	});
};

exports.deleteFavouriteList = (req, res, next) => {
	const homeID = req.params.homeId;
	console.log(homeID);
	favourite.deleteFavouriteById(homeID).then(() => {
		res.redirect("/favourite");
	});
};
