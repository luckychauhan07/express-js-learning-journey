exports.pageNotFound = (req, res, next) => {
	console.log(req.method, req.url);
	res.status(404).render("404Page", { isLoggedIn: false });
};
