'use strict';

const mongoose = require('mongoose');

// First Schema
const userSchema = mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String
});

//Static Method
userSchema.statics.list = function (filter, skip, limit, fields, sort) {
    //Create Query
    const query = User.find(filter);
    query.skip(skip);
    query.select(fields + '-_id');
    query.sort(sort);
    query.limit(limit);
}

// Create Model
const User = mongoose.model('User', userSchema);

module.exports = User;