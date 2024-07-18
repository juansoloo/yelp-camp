const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schema.js')
const Campground = require('../model/campground');
const Review = require('../model/review');
const expressError = require('../utils/expressError');


const ValidateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
}



router.post('/', ValidateReview, catchAsync(async(req,res) => {
    const campground = await Campground.findById(req.params._id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:_reviewId',catchAsync(async (req,res) => {
    const { _id, _reviewId } = req.params;
    await Campground.findByIdAndUpdate(_id, { $pull: {reviews: _reviewId} });
    await Review.findByIdAndDelete(_reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${_id}`);
}))

module.exports = router;