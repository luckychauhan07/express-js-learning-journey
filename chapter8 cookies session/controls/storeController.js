const favourite = require("../models/handleFavourite");
const home = require("../models/home");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
	Home.find().then((registerHomes) => {
		res.render("store/index", {
			registerHomes,
			currentPage: null,
			isLoggedIn: req.isLoggedIn,
		});
	});
	console.log(req.method, req.url, req.session.isLoggedIn);
};
exports.getBookings = (req, res, next) => {
	res.render("store/bookings", {
		currentPage: "Bookings",
		isLoggedIn: req.isLoggedIn,
	});
};
exports.postFavouriteList = async (req, res, next) => {
	const homeID = req.body.id;
	try {
		const existingFavorite = await favourite.findOne({ houseID: homeID });
		if (existingFavorite) {
			console.log("homme is already in the favourite list");
		} else {
			const favouriteHome = new favourite({ houseID: homeID });
			await favouriteHome.save();
			console.log("the home is added to the favourite");
		}
		res.redirect("/favourite");
	} catch (err) {
		console.error("Error adding to favourites:", err.message);
	}
};
exports.getFavouriteList = async (req, res, next) => {
	const favouriteHomeList = await favourite.find();
	await favourite
		.find()
		.populate("houseID")
		.then((fav) => {
			let favouritesHomeDetails = fav.map((favour) => favour.houseID);
			res.render("store/favourite-list", {
				favouritesHomeDetails,
				currentPage: "Favourites",
				isLoggedIn: req.isLoggedIn,
			});
		});
};
exports.getReserve = (req, res, next) => {
	res.render("store/reserve");
};
exports.getHomeList = (req, res, next) => {
	Home.find().then((registerHomes) => {
		res.render("store/home-list", {
			registerHomes,
			currentPage: "HomeList",
			isLoggedIn: req.isLoggedIn,
		});
	});
};
exports.getHomeDetails = (req, res, next) => {
	const homeId = req.params.homeId;
	console.log(homeId);
	Home.findById(homeId).then((home) => {
		res.render("store/home-details", { home, isLoggedIn: req.isLoggedIn });
	});
};

exports.deleteFavouriteList = (req, res, next) => {
	const homeID = req.params.homeId;
	console.log(homeID);
	favourite.findOneAndDelete({ houseID: homeID }).then(() => {
		res.redirect("/favourite");
	});
};
