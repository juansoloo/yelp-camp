const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Campground = require('../model/campground');
const Review = require('../model/review');
const { ValidateReview,isLoggedIn } = require('../middleware');




router.post('/', isLoggedIn, ValidateReview, catchAsync(async(req,res) => {
    const campground = await Campground.findById(req.params._id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
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