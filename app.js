const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const redisStore = require("connect-redis")(session);
const indexRouter = require("./routes/index");
const fs = require("fs");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
if (process.env.NODE_ENV === "production") {
	app.use(
		logger({
			format: "default",
			stream: fs.createWriteStream("app.log", { flags: "w" })
		})
	);
} else {
	app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		secret: "express-todo",
		store: new redisStore({}),
		resave: true,
		saveUninitialized: false
	})
);

setTimeout(
	() =>
		mongoose
			.connect(
				`mongodb://${process.env.DB_HOST || "localhost"}:27017/${
					process.env.DB
				}`
			)
			.then(() => {
				console.log("Connected to Database");
			})
			.catch(err => {
				console.log("Not Connected to Database ERROR! ", err);
			}),
	2000
);
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
