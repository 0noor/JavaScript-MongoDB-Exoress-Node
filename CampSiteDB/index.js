if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')

const MongoStore = require('connect-mongo');


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const connectSrcUrls = [
    "https://api.maptiler.com/", 
];

const { campgroundSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const Campgrounds = require('./models/campground');
const Review = require('./models/reviews.js');
const User = require('./models/users.js')
const exp = require('constants');

const userRoutes = require('./routes/users.js')
const CampgroundRoutes = require('./routes/campgrounds.js');
const ReviewsRoutes = require('./routes/reviews.js');
const dbUrl = 'mongodb://localhost:27017/yelp-camp';
// process.env.DB_URL;
mongoose.connect(dbUrl)
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!')
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!!")
        console.log(err)
    });


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
const fontSrcUrls =[];
app.use(helmet.contentSecurityPolicy({
    directives:
    {defaultSrc:[],
    connectSrc: ["'self'", ...connectSrcUrls],
    scriptSrc: ["'unsafe-inline'","'self'",...scriptSrcUrls],
    styleSrc:["'self'","'unsafe-inline'",...styleSrcUrls],
    workerSrc:["'self'","blob:"],
    objectSrc:[],
    imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/duc29caai/",
        "https://images.unsplash.com/",
        "https://images.unsplashed.com",
        "https://api.maptiler.com/",
    ],
    fontSrc: ["'self'",...fontSrcUrls]
},
})
);
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );
  
const store = new MongoStore({
    mongoUrl: dbUrl,
    secret: 'thisshouldbeabettersecret!',
    touchAfter:  24 * 60 *60

});

store.on("error", function (e){
    console.log('SESSION STORE ERROR', e)
})

const sessionConfig = {
    store,
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();

})

app.get('/', (req, res) => (

    res.render('home')
))

app.use('/', userRoutes)
app.use('/campgrounds', CampgroundRoutes)
app.use('/campgrounds/:id/reviews', ReviewsRoutes)





app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err })

})

app.listen(3000, () => {
    console.log('Server on port 3000')
})