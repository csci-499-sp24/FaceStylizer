const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define Schema
const imageRequestSchema = new Schema({
    userId: String,
    UID: String,
    uploadDate: Date,
});

// Compile Schema
const imageRequest = model('imageRequest', imageRequestSchema);

// Export
module.exports = {
    imageRequest
}
