const express = require("express");
const passport = require("passport");
const router = express.Router();

const Todo = require("../models/todo");
const convertDate = require("../lib/convertDate");
const isAuthenticated = require("../lib/isAuthenticated");

router.get("/", async function(req, res, next) {
	const [err] = req.flash("err");
	res.render("index", {
		title: "Express",
		user: req.user,
		err
	});
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
	let pastTodo;
	if (req.user) {
		pastTodo = await Todo.find({
			endDate: { $lt: Date.now() },
			owner: req.user
		});
	}
	const getTodos = await Todo.find({ owner: req.user }).sort({ type: -1 });

	const myTodos = getTodos.map(item => ({
		_id: item._id,
		endDate: convertDate(item.endDate),
		title: item.title,
		body: item.body,
		overDate: item.endDate <= Date.now(),
		type: item.type,
		check: item.check
	}));

	res.render("todos", {
		title: "Express",
		message: req.flash("signupMessage"),
		user: req.user,
		todos: myTodos,
		data: pastTodo.length > 0 ? pastTodo : false
	});
});

router.get("/edit/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
	}
	if (!myTodo) {
		req.flash("err", "검색된 데이터가 없습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}

	myTodo.end_date = convertDate(myTodo.endDate);
	const [err] = req.flash("err");
	res.render("edit", {
		title: "Express",
		user: req.user,
		todo: myTodo,
		err
	});
});

router.get("/delete/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "삭제하는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
	}
	if (!myTodo) {
		req.flash("err", "삭제하는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}

	await Todo.deleteOne({ _id: todoId });

	res.redirect("/todos");
});

router.get("/check/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}
	if (!myTodo) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}

	if (myTodo.check) myTodo.check = false;
	else myTodo.check = true;
	await myTodo.save();

	res.redirect("/todos");
});

router.get("/realhaste/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}
	if (!myTodo) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}

	myTodo.type = 3;
	await myTodo.save();

	res.redirect("/todos");
});

router.get("/haste/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}
	if (!myTodo) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}

	myTodo.type = 2;
	await myTodo.save();

	res.redirect("/todos");
});

router.get("/normal/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}
	if (!myTodo) {
		req.flash("err", "정보를 불러오는데 실패하였습니다. 다시 시도해주세요");
		res.redirect("/");
		return;
	}

	myTodo.type = 1;
	await myTodo.save();

	res.redirect("/todos");
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
	const newTodo = new Todo({ title, endDate, body, owner: req.user });
	await newTodo.save();
	res.redirect("/todos");
});

router.post("/edit/:id", isAuthenticated, async function(req, res, next) {
	const todoId = req.params.id;
	const { title, end_date, body } = req.body;
	let myTodo;
	try {
		[myTodo] = await Todo.find({ _id: todoId, owner: req.user });
	} catch (err) {
		req.flash("err", "수정하지 못하였습니다. 다시 시도해주세요");
		res.redirect("/edit/:id");
		return;
	}
	if (!myTodo) {
		res.redirect("/edit/:id");
		return;
	}
	myTodo.title = title;
	myTodo.endDate = end_date;
	myTodo.body = body;
	await myTodo.save();
	res.redirect("/todos");
});
module.exports = router;
