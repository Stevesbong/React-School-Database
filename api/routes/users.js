const express = require('express');
const router = express.Router();
const { User } = require('../db/index').models;

// Middleware
const { asyncHandler, authenticateUser } = require('../middleware/asyncAndAuthHandler');

// Encrypt password
const auth = require('basic-auth');


// Returns the current auth user
router.get('/users', authenticateUser(User), asyncHandler( async (req, res, next) => {
    const { currentUser } = req;
    const user = await User.findByPk(currentUser.id, {
        attributes: {
            exclude: [ 'password', 'createdAt', 'updatedAt' ]
        }
    })

    res.status(200).json(user)
}));


// Route that creates a new user.
router.post('/users', asyncHandler( async (req, res, next) => {
    try {
        const user = req.body;

        // hash password with bcryptjs
        if(user.password) {
            user.password = bcryptjs.hashSync(user.password);
        };
        await User.create(user);

        // Set the status to 201 Created and end the response.
        res.status(201).location('/').end();
    } catch(error) {
        const errorMessage = [];

        // If sequelize validation error issue
        if(error.name === 'SequelizeValidationError') {
            error.errors.map( err => errorMessage.push(err.message));
            res.status(400).json({ error: errorMessage })
        } else if(error.name === 'SequelizeUniqueConstraintError') {
            error.errors.map( err => errorMessage.push(err.message));
            res.status(400).json({ error: errorMessage })
        } else {
            next(error);
        }
    }
}))

module.exports = router