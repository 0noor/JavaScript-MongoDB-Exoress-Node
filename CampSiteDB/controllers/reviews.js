const Review = require('../models/reviews');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully Made New Review!');
    res.redirect(`/campgrounds/${campground._id}`);
}


module.exports.deleteReview = async (req, res) => {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } })
    await Review.findByIdAndDelete(reviewid)
    req.flash('success', 'Successfully Deleted Review!');

    res.redirect(`/campgrounds/${id}`);
}