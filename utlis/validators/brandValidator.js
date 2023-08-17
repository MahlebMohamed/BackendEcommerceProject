const { check } = require("express-validator");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");

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
        .withMessage('Too long Brand name'),
    validatorMiddlewares
];

exports.updateBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name required')
        .isLength({ min: 2 })
        .withMessage('Too short Brand name')
        .isLength({ max: 32 })
        .withMessage('Too long Brand name'),
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