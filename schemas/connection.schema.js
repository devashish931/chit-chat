const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    members: Array
})

module.exports = mongoose.model('connections', connectionSchema);