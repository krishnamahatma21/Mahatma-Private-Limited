const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().max(200).required(),
        image: joi.string().allow("",null),
        category: joi.string().valid("Mountains City","Farms","Arctic","Camping","City","Beach","Castles","Building").required(),
        price: joi.number().min(0).required(),
        location: joi.string().required(),
        country: joi.string().required()
    }),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required().max(100),
        rating: joi.number().min(1).max(5).required(),
    }).required()
});