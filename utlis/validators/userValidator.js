const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const User = require("../../model/userModel");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");

exports.getUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User id'),
    validatorMiddlewares
];

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name required')
        .isLength({ min: 2 })
        .withMessage('Too short User name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
            User.findOne({ email: val })
                .then((user) => {
                    if (user) {
                        return Promise.reject(new Error('E-mail already in user'));
                    }
                })
        ),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Too short User password')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),

    check('passwordConfirm')
        .notEmpty()
        .withMessage('PasswordConfirm is required'),

    check('phone').optional().isMobilePhone('ar-DZ'),

    check('profileImg').optional(),
    check('role').optional(),

    validatorMiddlewares
];

exports.updateUserValidator = [
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('id')
        .isMongoId()
        .withMessage('Invalid User id'),
    validatorMiddlewares
];

exports.deleteUserValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User id'),
    validatorMiddlewares
];