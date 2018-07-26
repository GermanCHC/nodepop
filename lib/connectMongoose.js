'use strict';
// Adding Mongoose connection
const mongoose = require('mongoose');
const conn = mongoose.connection;

// Manage error if it happens
conn.on('error', err => {
    console.log('Error de mongodb'.err);
});


conn.once('open', () => {
    console.log('Conectado a MongoDB en ', conn.name);
});

mongoose.connect(DATABASE_URI);

module.exports.conn = conn;
module.exports.dropDB = () => {
    conn.dropDatabase();
}