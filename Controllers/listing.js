const Listing = require("../Models/listing");

module.exports.index = async (req, res) => {
    const { category } = req.query;

    let allData;

    if (category) {
        allData = await Listing.find({ category });
    } else {
        allData = await Listing.find({});
    }

    res.render("listings/index.ejs", { allData });
};

module.exports.newListingForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    let result = await newListing.save();
    console.log("New Listing has been Added", result);
    req.flash("success", "New Listing has been Added");
    res.redirect("/listing");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id).populate(
        {
            path: "reviews",
            populate: {
                path: "owner",
            }
        }).populate("owner");
    if (!data) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listing");
    }
    res.render("./listings/show.ejs", { data });
};

module.exports.editListingForm = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id);
    if (!data) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listing");
    }

    let originalImgUrl = data.image.url;
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs", { data, originalImgUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        result.image = {url, filename};
        await result.save();
    }
    console.log("Listing has been Edited", result);
    req.flash("success", "Listing has been Updated");
    res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findByIdAndDelete(id);
    console.log("Listing has been Deleted", result);
    req.flash("success", "Listing has been Deleted");
    res.redirect("/listing");
};

module.exports.searchListing = async (req, res) => {
    let {q} = req.query;
    if (!q) {
        req.flash("error", "Listing not found");
        return res.redirect("/listing");
    }

    let allData = await Listing.find({ $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    if (allData.length === 0) {
        req.flash("error", "Listing not found");
        return res.redirect("/listing");
    }
    res.render("./listings/index.ejs", {allData});
};