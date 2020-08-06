const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/chitchat';

const connectDb = async () => {
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log("Database connection established");
    }).catch(error => {
        console.log("Database connection error", error);
    })

}

module.exports = connectDb;
