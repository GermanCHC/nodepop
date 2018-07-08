'use strict';
 
const mongoose = require('mongoose');

// First Schema
const userSchema = mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String
});

// Create Model
const User = mongoose.model('User', userSchema);

module.exports = User;