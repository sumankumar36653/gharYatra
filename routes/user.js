const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const userController = require("../controllers/users.js");

// Signup route 
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

//login route and authentication route
router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl, 
    passport.authenticate("local", { 
      failureFlash: true, 
      failureRedirect: "/login" 
    }), 
    userController.login
  );

// Logout route
router.post("/logout", userController.logout);

module.exports = router;