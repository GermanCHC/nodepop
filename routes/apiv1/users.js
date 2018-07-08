'use strict';

const express = require('express');
var i18n = require('i18n');
const DEFAULT_LANG = 'en';
const router = express.Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const localConfig = require('../../localConfig');

const jwtAuth = require('../../lib/jwtAuth');

router.post('/login', async (req,res,next) =>{
    try {
        //Get Credentials
        const email = req.body.email;
        var locale= req.body.localeCODE;
        if (!locale) {
            locale=DEFAULT_LANG;
        }
        i18n.setLocale(locale);
        var passwordHashed = crypto.createHash('sha256').update(req.body.password).digest('base64');
         
        //Search in Data Base
        const user = await User.findOne({email: email}).exec();
        // If user found continue
        if (!user) {
            res.json({
                success: true,
                message: i18n.__('invalid_credent')
            });
            return;
        }
        // Check password, if is ok continue
        if (passwordHashed !== user.password) {
            res.json({
                success: true,
                message: i18n.__('invalid_credent')
            });
            return;
        }

        //Create JWT
        jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, (err,token)=>{
            if (err) {
                next(err);
                return;
            }
            // Answer to client given JWT
            res.json({
                success: true,
                token
            });
        });
        
    } catch (err) {
        next(err);
    }
});

/**
 * POST /
 * Create a User
 */
router.post('/', jwtAuth() , async (req, res, next) => {
    try {
        // Create a user in memory
        const user = new User(req.body);
        user.password= crypto.createHash('sha256').update(user.password).digest('base64');
        // Save it in Data Base
        const savedUser = await user.save();
        res.json({
            success: true,
            result: savedUser
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;