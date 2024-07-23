const express = require('express')
const router = express.Router();
const campground = require('../controllers/campgrounds.js')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campgrounds = require('../models/campground');
const { campgroundSchema, reviewSchema } = require('../schemas.js')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary.js')
const upload = multer({ storage });



router.route('/')
    .get(catchAsync(campground.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.createCampground))



router.get('/new', isLoggedIn, campground.renderNewForm)

router.route('/:id').get(catchAsync(campground.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.renderEditForm))



module.exports = router;