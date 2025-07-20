let Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.updateListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);

  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!!");
  res.redirect(`/listings/${id}`);
};

module.exports.renderNewForm = (req, res) => {
  console.log(req.user);
  res.render("listings/new");
};

module.exports.newListing = async (req, res, next) => {
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const url = req.file.path;
  const filename = req.file.filename;

  console.log(url, "...", filename);
  const listing = req.body.listing;
  const newListing = new Listing(listing);
  newListing.owner = req.user._id;

  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  const savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The Listing you are looking for doesn't exist!");
    return res.redirect("/listings");
  }
  let originalImageURL = listing.image.url;
  console.log(originalImageURL);
  originalImageURL = originalImageURL.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImageURL });
};

module.exports.destroyListing = async (req, res, next) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "The Listing you are looking for doesn't exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};
