const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");

module.exports.createReview = async (req, res) => {
    let data = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.owner = req.user._id;
    data.reviews.push(newReview);

    await newReview.save();
    let result = await data.save();

    console.log("Review has been save", result);
    req.flash("success", "New Review has been Added");

    res.redirect(`/listing/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
    const {id, reviewsId} = req.params;
    
    let delReview = await Review.findByIdAndDelete(reviewsId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewsId}})

    console.log("Review has been deleted", delReview);
    req.flash("success", "Review has been Deleted");
    res.redirect(`/listing/${id}`);
};