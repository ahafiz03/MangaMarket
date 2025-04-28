const mongoose = require('mongoose');
const { body } = require('express-validator');

// Validate MongoDB ObjectId
exports.validateId = (req, res, next) => {
    const id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(id)) {
        return next();
    }

    const err = new Error('Invalid id');
    err.status = 400;
    next(err);
};

// Validate user signup
exports.validateSignUp = [
    body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
    body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be between 8 and 64 characters').isLength({ min: 8, max: 64 })
];

// Validate user login
exports.validateLogIn = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be between 8 and 64 characters').isLength({ min: 8, max: 64 })
];

// Validate manga listing
exports.validateManga = [
    body('title', 'Title cannot be empty').notEmpty().trim().escape(),
    body('condition')
        .notEmpty().withMessage('Condition is required')
        .trim().escape()
        .isIn(['New', 'Like New', 'Very Good', 'Good', 'Acceptable'])
        .withMessage('Invalid condition value'),
    body('price', 'Price must be a number greater than 0')
        .notEmpty()
        .isFloat({ gt: 0 })
        .toFloat(),
    body('details', 'Details cannot be empty')
        .notEmpty()
        .trim()
        .escape()
];

// Validate offer creation
exports.validateOffer = [
    body('amount', 'Offer amount must be a number greater than 0')
        .notEmpty()
        .isFloat({ gt: 0 })
        .toFloat()
];