const Campgrounds = require('../models/campground');
const { cloudinary } = require('../cloudinary/cloudinary');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


module.exports.index =
    async (req, res) => {

        const campgrounds = await Campgrounds.find({});
        res.render('campgrounds/index', { campgrounds })
    }

module.exports.renderNewForm = (req, res) => {

    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {

    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = new Campgrounds(req.body.campground);
    campground.geometry = geoData.features[0].geometry;
    campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully Made New Campground!');
    res.redirect(`/campgrounds/${campground._id}`);


}

module.exports.show = async (req, res) => {
    const campground = await Campgrounds.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground Does Not Exist!');
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campgrounds.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Campground Does Not Exist/Can Not Be Edited!');
        res.redirect('/campgrounds')
    }

    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const campground = await Campgrounds.findByIdAndUpdate(id, { ...req.body.campground });
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    campground.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.image.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Successfully Updated Campground!');

    res.redirect(`/campgrounds/${campground._id}`)

}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campgrounds.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted Campground!');

    res.redirect('/campgrounds')
}