var express = require("express");
var passport = require("passport");
var router = express.Router();

var Todo = require("../models/todo");
var isAuthenticated = require("../lib/isAuthenticated");

router.get("/", async function(req, res, next) {
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

router.get("/todos", isAuthenticated, async function(req, res, next) {
	const myTodos = await Todo.find({ owner: req.user });
	console.log(myTodos);
	res.render("todos", {
		title: "Express",
		message: req.flash("signupMessage"),
		user: req.user,
		todos: myTodos
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

router.post("/write", isAuthenticated, async function(req, res, next) {
	const { title, end_date: endDate, body } = req.body;
	var newTodo = new Todo({ title, endDate, body, owner: req.user });
	await newTodo.save();
	res.redirect("/todos");
});
module.exports = router;
