const express = require("express");
const passport = require("passport");

const router = express.Router();
const {
	myBookCreate,
	mybookList,
} = require("../controllers/myBookControllers");

router.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	myBookCreate
);

router.get("/", mybookList);

module.exports = router;
