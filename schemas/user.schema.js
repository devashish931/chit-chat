const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    connections: [String],
    location: {
        latitude: Number,
        longitude: Number
    },
    name: {
        type: String,
        required: true
    },
    notificationToken: String,
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    status: Boolean,
    username: {
        type: String,
        unique: true,
        required: true,
    }
})

module.exports = mongoose.model('users', userSchema);