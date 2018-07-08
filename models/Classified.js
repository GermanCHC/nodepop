'use strict';

const mongoose = require('mongoose');

// First Schema
const classifiedSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});
classifiedSchema.index({name:'text'});

//Static Method
classifiedSchema.statics.list = function (filter, skip, limit, fields, sort) {
    //Create Query
    const query = Classified.find(filter);
    if (fields) {
        query.select(fields + " -_id");
    }
    query.sort(sort);
    query.skip(skip);
    query.limit(limit);

    console.log(query);
    //Execute query and return promise
    return query.exec();
};

// Create Model
const Classified = mongoose.model('Classified', classifiedSchema);

module.exports = Classified;