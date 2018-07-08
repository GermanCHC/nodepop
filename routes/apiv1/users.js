const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const crypto = require('crypto');
/**
 * POST /
 * Create a User
 */
router.post('/', async (req, res, next) => {
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