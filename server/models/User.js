const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define Schema
const userSchema = new Schema({
    username: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
});

// Compile Schema
const User = model('User', userSchema);

// Export 
module.exports = {
    User
}
