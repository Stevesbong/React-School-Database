const express = require('express');
const router = express.Router();

// require two models
const { User, Course } = require('../db/index').models;

// Middleware
const { asyncHandler, authenticateUser } = require('../middleware/asyncAndAuthHandler');

// Encrypt password
const auth = require('basic-auth');
const { check, validationResult } = require('express-validator');

// Return all courses.
router.get('/courses', asyncHandler( async ( req, res, next) => {
    const courses = await Course.findAll({
        attributes: {
            exclude: [ 'createdAt', 'updatedAt' ]
        },
        include: {
            model: User,
            as: 'user',
            attributes: {
                exclude: [ 'password', 'createdAt', 'updatedAt' ]
            }
        }
    });
    res.status(200).json({ courses })
}));


// Returns single course.
router.get('/courses/:id', asyncHandler( async ( req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: {
            exclude: [ 'createdAt', 'updatedAt' ]
        },
        include: {
            model: User,
            as: 'user',
            attributes: {
                exclude: [ 'password', 'createdAt', 'updatedAt' ]
            }
        }
    })

    if(course) {
        res.status(200).json({ course })
    } else {
        res.status(400).json({ message: 'Course not Found.' })
    }
}));


// Create course.
router.post('/courses', authenticateUser(User), asyncHandler( async ( req, res, next) => {
    console.log('create')
    try {
        const course = await Course.create(req.body);

        // Set the status to 201 Created and end the response.
        res.status(201).location('/').end();
    } catch (error) {
        const errorMessage = [];
        if(error.name === 'SequelizeValidationError') {
            // Use the Array `map()` method to get a list of error messages.
            error.errors.map( err => errorMessage.push(err.message));

            // Return the validation errors to the client.
            res.status(400).json({ error: errorMessage })
        } else {
            next(error);
        }
    }
}));


// Edit course only owned by current user.
router.put('/courses/:id', [
    check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Title is not valid.'),
    check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Description is not valid.')
], authenticateUser(User), asyncHandler( async ( req, res, next) => {
    const { currentUser } = req;
    const course = await Course.findByPk(req.params.id);

    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors
    if(!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessage = errors.array().map(error => error.msg);

        // Return the validation errors to the client.
        return res.status(400).json({ errors: errorMessage });
    }

    // If course exists.
    if(course) {
        if(course.userId === currentUser.id) {
            try {
                await course.update(req.body);
                res.status(204).end();
            } catch (error) {
                const errorMessage = [];
                // If sequelize validation error
                if(error.name === 'SequelizeValidationError') {
                    // Use the Array `map()` method to get a list of error messages.
                    error.errors.map( err => errorMessage.push(err.message));

                    // Return the validation errors to the client.
                    res.status(400).json({ error: errorMessage });
                } else {
                    next(error);
                }
            }
        } else {
            res.status(403).json({ message: 'User is Not Authorized.' })
        }
    } else {
        res.status(404).json({ message: 'Course Not Found.' })
    }
}));


// Delete course only owned by current user.
router.delete('/courses/:id', authenticateUser(User), asyncHandler( async ( req, res, next ) => {
    const { currentUser } = req;
    const course = await Course.findByPk(req.params.id);

    if(course) {
        if(course.userId === currentUser.id) {
            await course.destroy();
            res.status(204).end();;
        } else {
            res.status(403).json({ message: 'User is Not Authorized.' })
        }
    } else {
        res.status(404).json({ message: 'Course Not Found.' })
    }
}))

module.exports = router;