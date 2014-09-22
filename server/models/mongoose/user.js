var mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        role: String,
        email: String,
        googleId: String
    }),
    User = mongoose.model('User', UserSchema, 'users');

module.exports = User;