var express = require("express");
var passport = require("passport");
var router = express.Router();

var isAuthenticated = require("../lib/isAuthenticated");

/* GET home page. */
router.get("/", function(req, res, next) {
	console.log(req.user);
	res.render("index", { title: "Express", user: req.user });
});

router.get("/write", isAuthenticated, function(req, res, next) {
	res.render("write", { title: "Express", user: req.user });
});

router.get("/login", function(req, res, next) {
	res.render("login", {
		title: "Express",
		message: req.flash("loginMessage"),
		user: req.user
	});
});

router.get("/logout", function(req, res, next) {
	req.logout();
	res.redirect("/");
});

router.get("/signup", function(req, res, next) {
	res.render("signup", {
		title: "Express",
		message: req.flash("signupMessage"),
		user: req.user
	});
});

router.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})
);

router.post(
	"/signup",
	passport.authenticate("signup", {
		successRedirect: "/",
		failureRedirect: "/signup",
		failureFlash: true
	})
);
module.exports = router;
