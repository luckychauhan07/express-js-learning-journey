const favourite = require("../models/handleFavourite");
const home = require("../models/home");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
	Home.find().then((registerHomes) => {
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
	// const favouriteHouseIDs = favouriteHomeList.map((fav) => fav.houseID);
	//  = await Promise.all(
	// 	favouriteHouseIDs.map((id) => Home.findById(id))
	// );
	await favourite
		.find()
		.populate("houseID")
		.then((fav) => {
			let favouritesHomeDetails = fav.map((favour) => favour.houseID);
			res.render("store/favourite-list", { favouritesHomeDetails });
		});
};
exports.getReserve = (req, res, next) => {
	res.render("store/reserve");
};
exports.getHomeList = (req, res, next) => {
	Home.find().then((registerHomes) => {
		res.render("store/home-list", { registerHomes });
	});
};
exports.getHomeDetails = (req, res, next) => {
	const homeId = req.params.homeId;
	console.log(homeId);
	Home.findById(homeId).then((home) => {
		res.render("store/home-details", { home });
	});
};

exports.deleteFavouriteList = (req, res, next) => {
	const homeID = req.params.homeId;
	console.log(homeID);
	favourite.findOneAndDelete({ houseID: homeID }).then(() => {
		res.redirect("/favourite");
	});
};
