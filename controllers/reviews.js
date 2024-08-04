const Campground = require('../model/campground');
const Review = require('../model/review');

module.exports.createReview = async(req,res) => {
    const campground = await Campground.findById(req.params._id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req,res) => {
    const { _id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(_id, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    console.log(_id , 'test')
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${_id}`);
}