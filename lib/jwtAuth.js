'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');
var i18n = require('i18n');
const DEFAULT_LANG = 'en';

// Export a function to return a middleware to check JWT
module.exports = function () {
    return (req, res, next) => {
        // Get token of request
        const token = req.body.token || req.query.token || req.get('x-access-token');
        var locale= req.body.localeCODE;
        if (!locale) {
            locale=DEFAULT_LANG;
        }
        i18n.setLocale(locale);

        // If there is not a token answer 'not authorize'
        if (!token) {
            const err = new Error(i18n.__('no_token'));
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
            req.user_id = decoded.user_id;
            next();
        });
    };
};