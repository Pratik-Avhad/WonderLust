const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const user = require("../models/user");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const userController = require("../controller/users");

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.signUp));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );

router.get("/logout", userController.logout);

module.exports = router;
