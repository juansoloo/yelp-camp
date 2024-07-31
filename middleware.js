const { campgroundSchema,reviewSchema } = require('./schema.js');
const expressError = require('./utils/expressError');
const Campground = require('./model/campground');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.returnTo = req.orginalUrl
        req.flash('error', 'YOU MUST BE SIGNED IN')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateCampground = (req,res,next) => {
    const { error } = campgroundSchema.validate(req.body); 
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req,res,next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', "Do not have permission");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.ValidateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
}