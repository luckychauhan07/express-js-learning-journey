const favourite = require("../models/handleFavourite");
const Home = require("../models/home");
// exports.registerHomes = registerHomes;
exports.getHomes = (req, res, next) => {
	Home.fetchAll().then(([registerHomes]) => {
		res.render("store/index", { registerHomes });
	});
	console.log(req.method, req.url);
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
		Home.fetchAll().then(([registerHomes]) => {
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
	Home.fetchAll().then(([registerHomes]) => {
		res.render("store/home-list", { registerHomes });
	});
};
exports.getHomeDetails = (req, res, next) => {
	const homeId = req.params.homeId;
	Home.findHomeById(homeId).then(([homes]) => {
		const home = homes[0];
		res.render("store/home-details", { home });
	});
};

exports.deleteFavouriteList = (req, res, next) => {
	const homeID = req.params.homeId;
	favourite.deleteFavouriteById(homeID, (err) => {
		if (err) console.log("error while writting file");
		else console.log("file write successfully");
	});
	res.redirect("/favourite");
};
