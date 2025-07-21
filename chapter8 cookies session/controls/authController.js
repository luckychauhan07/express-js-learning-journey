const home = require("../models/home");

exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		pageTitle: "Login page",
		currentPage: "Login",
		isLoggedIn: false,
	});
};

exports.postLogin = (req, res, next) => {
	// used to access the session
	req.session.isLoggedIn = true;
	req.session.user = "lucky";
	console.log(req.body);
	res.redirect("/");
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect("/login");
	});
};
