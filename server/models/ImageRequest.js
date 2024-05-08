const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define Schema
const imageRequestSchema = new Schema({
    userId: String,
    UID: String,
    fileURL: String,
    style: String,
    uploadDate: Date
});

// Compile Schema
const ImageRequest = model('ImageRequest', imageRequestSchema);

// Export
module.exports = {
    ImageRequest
}
