'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// Export a function to return a middleware to check JWT
module.exports = function () {
    return (req, res, next) => {
        // Get token of request
        const token = req.body.token || req.query.token || req.get('x-access-token');

        // If there is not a token answer 'not authorize'
        if (!token) {
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }

        // Verify token and go to next middleware
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                err.status = 401;
                next(err);
                return;
            }
            next();
        });
    };
};