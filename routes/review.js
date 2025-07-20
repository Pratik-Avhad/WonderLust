const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isAuthor } = require("../middlewares");
const reviewController = require("../controller/reviews");

//review route
router.post("/", validateReview, wrapAsync(reviewController.createReview));

//review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
