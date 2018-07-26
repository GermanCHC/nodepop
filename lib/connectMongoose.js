'use strict';
// Adding Mongoose connection
const mongoose = require('mongoose');
const conn = mongoose.connection;

var databaseUri = process.env.DATABASE_URI;

if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');    
}

// Manage error if it happens
conn.on('error', err => {
    console.log('Error de mongodb'.err);
});


conn.once('open', () => {
    console.log('Conectado a MongoDB en ', conn.name);
});

mongoose.connect(databaseUri);

module.exports.conn = conn;
module.exports.dropDB = () => {
    conn.dropDatabase();
}