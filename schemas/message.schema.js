const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    connectionId: String,
    message: String,
    reciever: String,
    sender: String,
    sendTime: {
        type: Date,
        default: Date.now
    },
    recieveTime: {
        type: Date
    },
    seenTime: {
        type: Date
    }
})

module.exports = mongoose.model('messages', messageSchema);
