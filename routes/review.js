const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isReviewOwner, validateReview} = require("../middleware.js");
const reviewsControllers = require("../Controllers/reviews.js");

//Reviews Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsControllers.createReview));

// Review Delete
router.delete("/:reviewsId", isLoggedIn, isReviewOwner, wrapAsync(reviewsControllers.deleteReview));

module.exports = router;