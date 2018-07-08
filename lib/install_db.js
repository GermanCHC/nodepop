'use strict';
const connMong = require('./connectMongoose');
const fs = require('fs');
const path = require('path');
const numClassified = 10;

const Classified = require('../models/Classified');
const User = require('../models/User');

const crypto = require('crypto');

/**
 * Drop collections and load default data
 * @param {retuns error if it happens} callback 
 */
function loadDemoData(callback) {
    // Drop database
    // conn.dropDB();
    // Delete previous users
    connMong.conn.dropCollection("users", (err) => {
        if (err) {
            callback(err);
            return;
        }
    });
    // Load Demo Users Data from File 
    getUsers(callback);

    // Delete previous classifieds
    connMong.conn.dropCollection("classifieds", (err) => {
        if (err) {
            callback(err);
            return;
        }
    });

    // Load Demo Classifieds from File
    getClassifieds(callback);
}

/**
 * Function that return users from file
 * @param {retuns error if it happens} callback 
 */
function getUsers(callback) {
    // Get route to file
    const usersFile = path.join(__dirname, './usersDemoData.json');
    // Read users file
    fs.readFile(usersFile, 'utf8', (err, data) => {
        // Manage error
        if (err) {
            callback(err);
            return;
        }
        //Process Users Data
        let usersObject;
        try {
            // Transform content into object
            usersObject = JSON.parse(data);

            // Doing a Hash to the password
            usersObject.users.forEach(function(userItem){
                userItem.password= crypto.createHash('sha256').update(userItem.password).digest('base64');
            });

            // Insert all users
            User.insertMany(usersObject.users);
        } catch (err) {
            callback(err);
            return;
        }
    });
}

/**
 * Function that return classifieds from file
 * @param {retuns error if it happens} callback 
 */
function getClassifieds(callback) {
    // Get route to file
    const classifiedsFile = path.join(__dirname, './classifiedsDemoData.json');
    // Read classifieds file
    fs.readFile(classifiedsFile, 'utf8', (err, data) => {
        // Manage error
        if (err) {
            callback(err);
            return;
        }
        //Process Classifieds Data
        let classifiedsObject;
        try {
            // convertir a objeto el contenido
            classifiedsObject = JSON.parse(data);
            Classified.insertMany(classifiedsObject.classifieds);
        } catch (err) {
            callback(err);
            return;
        }
    });
}

loadDemoData(function (err, str) {
    if (err) {
        console.error('There was an error', err);
        return;
    }
});