const { check } = require("express-validator");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");
const { default: slugify } = require("slugify");

exports.getBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Brand id'),
    validatorMiddlewares
];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name required')
        .isLength({ min: 2 })
        .withMessage('Too short Brand name')
        .isLength({ max: 32 })
        .withMessage('Too long Brand name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddlewares
];

exports.updateBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name required')
        .isLength({ min: 2 })
        .withMessage('Too short Brand name')
        .isLength({ max: 32 })
        .withMessage('Too long Brand name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('id')
        .isMongoId()
        .withMessage('Invalid Brand id'),
    validatorMiddlewares
];

exports.deleteBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Brand id'),
    validatorMiddlewares
];