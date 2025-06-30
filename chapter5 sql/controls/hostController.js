const Home = require("../models/home");
exports.getAddHomes = (req, res, next) => {
	res.render("host/homeRegister", {
		editing: false,
		pageTitle: "register",
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
	const home = new Home(
		houseName,
		chargePerNight,
		location,
		rating,
		imageUrl,
		description
	);
	home.save().then(() => res.render("host/success"));
};
exports.getEditHomes = (req, res, next) => {
	const editing = req.query.editing;
	const homeId = req.params.id;
	Home.findHomeById(homeId).then(([editHomeObj]) => {
		const editHome = editHomeObj[0];
		res.render("host/homeRegister", {
			editing: editing,
			pageTitle: "edit ",
			editHome: editHome,
		});
	});
};
exports.getHostHomeList = (req, res, next) => {
	Home.fetchAll().then(([registerHomes]) => {
		res.render("host/host-home-list", { registerHomes });
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
	const home = new Home(
		houseName,
		chargePerNight,
		location,
		rating,
		imageUrl,
		description,
		homeId
	);
	home.save().then(() => res.redirect("/host/host-home-list"));
};

exports.postHostHomeList = (req, res, next) => {
	const homeId = req.body.homeId;
	// console.log(homeId);
	Home.deleteById(homeId).then(() => {
		res.redirect("/host/host-home-list");
	});
};
