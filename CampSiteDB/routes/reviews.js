const express = require('express')
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Review = require('../models/reviews.js');
const Campground = require('../models/campground.js');
const Reviews = require('../controllers/reviews.js')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js')

router.post('/', isLoggedIn, validateReview, catchAsync(Reviews.createReview))

router.delete('/:reviewid', isLoggedIn, isReviewAuthor, catchAsync(Reviews.deleteReview))

module.exports = router;