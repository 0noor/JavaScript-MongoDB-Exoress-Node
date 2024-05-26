const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
    .then(() => {
        console.log("connection open!!!")
    })
    .catch(err => {
        console.log("oh no error")
        console.log(err)
    })