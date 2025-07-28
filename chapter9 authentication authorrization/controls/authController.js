const home = require("../models/home");
const { check, validationResult } = require("express-validator");
// const User = require("../models/user");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const user = require("../models/user");

exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		pageTitle: "Login page",
		currentPage: "Login",
		isLoggedIn: false,
		errors: [],
		oldInput: { email: "" },
		user: {},
	});
};

exports.postLogin = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(422).render("auth/login", {
			pageTitle: "login page",
			currentPage: "Login",
			isLoggedIn: false,
			errors: ["user does not match"],
			oldInput: { email },
		});
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(422).render("auth/login", {
			pageTitle: "login page",
			currentPage: "Login",
			isLoggedIn: false,
			errors: ["invalid credentials"],
			oldInput: { email },
		});
	}
	// used to access the session
	req.session.isLoggedIn = true;
	req.session.user = user;
	await req.session.save();
	res.redirect("/");
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect("/login");
	});
};

exports.getSignup = (req, res, next) => {
	res.render("auth/signup", {
		pageTitle: "SignUp page",
		currentPage: "Sign Up",
		isLoggedIn: false,
		errors: [],
		user: {},
		oldInput: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			userType: "",
		},
	});
};

exports.postSignup = [
	check("firstName")
		.trim()
		.isLength({ min: 2 })
		.withMessage("first name should be atleast 2 characters long")
		.matches(/^[A-Za-z\s]+$/)
		.withMessage("First name should contain aplhabets only"),
	check("lastName")
		.trim()
		.matches(/^[A-Za-z\s]*$/)
		.withMessage("First name should contain aplhabets only"),
	check("email")
		.trim()
		.isEmail()
		.withMessage("Please enter a valid email address")
		.normalizeEmail(),
	,
	check("password")
		.trim()
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long")
		.matches(/[A-Z]/)
		.withMessage("Password must contain at least one uppercase letter")
		.matches(/[a-z]/)
		.withMessage("Password must contain at least one lowercase letter")
		.matches(/[0-9]/)
		.withMessage("Password must contain at least one number")
		.matches(/[@$!%*?&]/)
		.withMessage("Password must contain at least one special character"),

	check("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match");
		}
		return true;
	}),
	check("userType")
		.notEmpty()
		.withMessage("please select atleast one user type")
		.isIn(["guest", "host"])
		.withMessage("invalid user type"),
	check("terms")
		.notEmpty()
		.custom((value, { req }) => {
			if (value !== "on") {
				throw new Error("please accept the terms and conditions");
			}
			return true;
		}),
	(req, res, next) => {
		const { firstName, lastName, email, password, userType } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console;
			return res.status(422).render("auth/signup", {
				pageTitle: "SignUp page",
				currentPage: "Sign Up",
				isLoggedIn: false,
				errors: errors.array().map((err) => err.msg),
				oldInput: { firstName, lastName, email, password, userType },
				user: {},
			});
		}
		bcrypt
			.hash(password, 12)
			.then((hashedPassword) => {
				const user = new User({
					firstName,
					lastName,
					email,
					password: hashedPassword,
					userType,
				});
				return user.save();
			})
			.then(() => {
				res.redirect("/");
			})
			.catch((err) => {
				return res.status(422).render("auth/signup", {
					pageTitle: "SignUp page",
					currentPage: "Sign Up",
					isLoggedIn: false,
					user: {},
					errors: [err.message],
					oldInput: {
						firstName,
						lastName,
						email,
						password,
						userType,
					},
				});
			});
	},
];
