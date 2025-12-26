const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;


const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);