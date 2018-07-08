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

mongoose.connect('mongodb://localhost/nodepop');

module.exports.conn = conn;
module.exports.dropDB = () => {
    conn.dropDatabase();
}