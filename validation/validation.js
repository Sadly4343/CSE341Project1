const { body, validationResult } = require('express-validator')
const clientValidationRules = () => {
    return [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Must be a valid email'),
        body('name')
            .notEmpty().withMessage('Name is required')

            .isLength({ min: 2 }).withMessage('Name must be at least 2 letters long'),
        body('phone')
            .notEmpty().withMessage('Phone is required')

            .isMobilePhone().withMessage('Must be a valid phone number'),
        body('address')
            .notEmpty().withMessage('Address is required')
    ]
}

const carValidationRules = () => {
    return [
            body('make')
            .notEmpty().withMessage('Make is required')
            .isLength({ min: 2 }).withMessage('Make must be at least 2 characters long'),
        body('model')
            .notEmpty().withMessage('Model is required')
            .isLength({ min: 2 }).withMessage('Model must be at least 2 characters long'),
        body('year')
            .notEmpty().withMessage('Year is required')
            .isInt({ min: 4, max: 4} ).withMessage('Year must be a valid year'),
        body('color')
            .notEmpty().withMessage('Color is required'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('mileage')
            .notEmpty().withMessage('Mileage is required')
            .isInt({ min: 0 }).withMessage('Mileage must be a positive integer'),
        body('ownerId')
            .notEmpty().withMessage('Owner ID is required')
            .isMongoId().withMessage('Owner ID must be a valid Mongo ID')
    ]
}

const validate = (req, res, next) => {
    let errors = [];
    errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []

    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg}))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    clientValidationRules,
    carValidationRules,
    validate
}