const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controllers/user.js");

router.route("/signup")
.get(userController.signUpForm)
.post(wrapAsync(userController.createUser));

router.route("/login")
.get(userController.loginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.checkUser);

router.get("/logout", userController.logoutUser);

module.exports = router;