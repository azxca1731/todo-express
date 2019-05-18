var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/write", function(req, res, next) {
	res.render("write", { title: "Express" });
});

router.get("/login", function(req, res, next) {
	res.render("login", { title: "Express" });
});

router.post("/login", function(req, res, next) {
	console.log(req.body);
	//로그인 구현
	res.render("index", { title: "Express" });
});
module.exports = router;
