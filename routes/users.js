const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const passport = require("passport");

//signup Router
router.post("/signup", controller.signup);
//signin Router
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  controller.signin
);

module.exports = router;
