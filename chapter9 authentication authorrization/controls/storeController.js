const User = require("../models/user");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
	Home.find().then((registerHomes) => {
		res.render("store/index", {
			registerHomes,
			currentPage: null,
			isLoggedIn: req.isLoggedIn,
			user: req.session.user,
		});
	});
	console.log(req.method, req.url, req.session.isLoggedIn);
};
exports.getBookings = (req, res, next) => {
	res.render("store/bookings", {
		currentPage: "Bookings",
		isLoggedIn: req.isLoggedIn,
		user: req.session.user,
	});
};
exports.postFavouriteList = async (req, res, next) => {
	const homeID = req.body.id;
	const userId = req.session.user._id;
	const user = await User.findById(userId);

	try {
		if (!user.favourites.includes(homeID)) {
			user.favourites.push(homeID);
			await user.save();
			console.log("home is added to the favourites");
		} else {
			console.log("home is already added to the favourites");
		}
		res.redirect("/favourite");
	} catch (err) {
		console.error("Error adding to favourites:", err.message);
	}
};
exports.getFavouriteList = async (req, res, next) => {
	const userId = req.session.user._id;
	const user = await User.findById(userId).populate("favourites");
	res.render("store/favourite-list", {
		favouritesHomeDetails:
			user.favourites.length > 0 ? user.favourites : [],
		currentPage: "Favourites",
		isLoggedIn: req.isLoggedIn,
		user: req.session.user,
	});
};
exports.getReserve = (req, res, next) => {
	res.render("store/reserve", {
		isLoggedIn: req.isLoggedIn,
		user: req.session.user,
	});
};
exports.getHomeList = (req, res, next) => {
	Home.find().then((registerHomes) => {
		res.render("store/home-list", {
			registerHomes,
			currentPage: "HomeList",
			isLoggedIn: req.isLoggedIn,
			user: req.session.user,
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

exports.deleteFavouriteList = async (req, res, next) => {
	const homeID = req.params.homeId;
	const userId = req.session.user._id;
	const user = await User.findById(userId);
	if (user.favourites.includes(homeID)) {
		user.favourites = user.favourites.filter((fav) => fav != homeID);
		await user.save();
	}
	res.redirect("/favourite");
};
