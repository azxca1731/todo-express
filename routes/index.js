var express = require("express");
var passport = require("passport");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	console.log(req.session);
	console.log(req.user);
	res.render("index", { title: "Express" });
});

router.get("/write", function(req, res, next) {
	res.render("write", { title: "Express" });
});

router.get("/login", function(req, res, next) {
	res.render("login", { title: "Express" });
});

router.get("/signup", function(req, res, next) {
	res.render("signup", { title: "Express" });
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
