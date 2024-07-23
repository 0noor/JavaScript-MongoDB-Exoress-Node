const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers')
const cities = require('./cities')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!')
    })
    .catch(err => {
        console.log("OH NO MONGO ERROR!!!!!")
        console.log(err)
    });

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6681c2d800471f8eab1109c6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/484351`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque itaque dolorum nobis totam quia sint aspernatur sunt ad natus, blanditiis earum velit qui enim quasi ipsam laudantium dolores, deleniti atque!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
              },
            image: [
                {
                    url: 'https://res.cloudinary.com/duc29caai/image/upload/v1720122789/YelpCamp/fe0k7kcbg56ehudaep1u.jpg',
                    filename: 'YelpCamp/fe0k7kcbg56ehudaep1u',

                },
                {
                    url: 'https://res.cloudinary.com/duc29caai/image/upload/v1720122789/YelpCamp/y8pevuwthhhdgmbdzzyn.jpg',
                    filename: 'YelpCamp/y8pevuwthhhdgmbdzzyn',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});