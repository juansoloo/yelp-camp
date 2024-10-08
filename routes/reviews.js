const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
// const Campground = require('../model/campground');
// const Review = require('../model/review');
const reviews = require('../controllers/reviews')
const { ValidateReview,isLoggedIn,isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, ValidateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;