const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isListingOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../Controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//index and createListing
router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.createListing));

//new Listing Form
router.get("/new", isLoggedIn, listingControllers.newListingForm);

//search
router.get("/search", listingControllers.searchListing);

//showlisting, updateListing, deleteListing
router.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn, isListingOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn, isListingOwner, wrapAsync(listingControllers.deleteListing));

//editListingForm
router.get("/:id/edit", isLoggedIn, isListingOwner, wrapAsync(listingControllers.editListingForm));

module.exports = router;