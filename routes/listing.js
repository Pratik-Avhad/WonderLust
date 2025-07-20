const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares");
const listingController = require("../controller/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.newListing)
);
// .post( (req, res) => {
//   res.send(req.file);
// });

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  );

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
