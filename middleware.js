const Listing = require("./Models/listing");
const Review = require("./Models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You need to Login");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isListingOwner = async (req, res, next) => {
    let { id } = req.params;
    let checkUser = await Listing.findById(id);
    if (!checkUser.owner._id.equals(res.locals.user._id)) {
        req.flash("error", "You are not authorize for this post");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.isReviewOwner = async (req, res, next) => {
    let { id, reviewsId } = req.params;
    let checkReview = await Review.findById(reviewsId);
    if (!checkReview.owner._id.equals(res.locals.user._id)) {
        req.flash("error", "You are not authorize for this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if ( error ) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if ( error ) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};