const home = require("../models/home");
const Home = require("../models/home");
exports.getAddHomes = (req, res, next) => {
	res.render("host/homeRegister", {
		editing: false,
		pageTitle: "register",
		currentPage: "Register",
		isLoggedIn: req.isLoggedIn,
	});
};

exports.postAddHomes = (req, res, next) => {
	const {
		houseName,
		chargePerNight,
		location,
		rating,
		imageUrl,
		description,
	} = req.body;
	const home = new Home({
		houseName,
		price: chargePerNight,
		location,
		rating,
		photoUrl: imageUrl,
		description,
	});
	home.save().then(() =>
		res.render("host/success", { isLoggedIn: req.isLoggedIn })
	);
};
exports.getEditHomes = (req, res, next) => {
	const editing = req.query.editing;
	const homeId = req.params.id;
	Home.findById(homeId).then((editHome) => {
		res.render("host/homeRegister", {
			editing: editing,
			pageTitle: "edit ",
			editHome: editHome,
			isLoggedIn: req.isLoggedIn,
		});
	});
};
exports.getHostHomeList = (req, res, next) => {
	Home.find().then((registerHomes) => {
		res.render("host/host-home-list", {
			registerHomes,
			currentPage: "Host homeList",
			isLoggedIn: req.isLoggedIn,
		});
	});
};

exports.postEditHome = (req, res, next) => {
	const {
		houseName,
		chargePerNight,
		location,
		rating,
		imageUrl,
		description,
		homeId,
	} = req.body;
	home.findById(homeId)
		.then((home) => {
			home.houseName = houseName;
			home.price = chargePerNight;
			home.location = location;
			home.rating = rating;
			home.photoUrl = imageUrl;
			home.description = description;
			home.save()
				.then(() => {
					console.log("home saved successfully");
					res.redirect("/host/host-home-list");
				})
				.catch((err) => {
					console.log("home not saved");
				});
		})
		.catch((err) => {
			console.log("error while finding the home", err);
		});
};

exports.postHostHomeList = (req, res, next) => {
	const homeId = req.body.homeId;
	Home.findByIdAndDelete(homeId).then(() => {
		res.redirect("/host/host-home-list");
	});
};
