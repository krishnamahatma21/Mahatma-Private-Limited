const User = require("../Models/user.js");

module.exports.signUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.createUser = async (req, res, next) => {
    try {
        let { fname, lname, dob, email, username, password } = req.body;
        const data = new User({ fname, lname, dob, email, username });
        const result = await User.register(data, password);
        console.log(result);
        req.login(result, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "User Successfully Registered");
            res.redirect("/listing");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.checkUser = async (req, res) => {
    let result = res.locals.redirectUrl || "/listing";
    console.log(`User has been Login`);
    req.flash("success", "User Successfully Login");
    res.redirect(result);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        console.log(`User has been Logout`);
        req.flash("success", "You are Logout");
        res.redirect("/listing");
    });
};