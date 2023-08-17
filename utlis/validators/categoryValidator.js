const { check } = require("express-validator");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");

exports.getCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid category id'),
    validatorMiddlewares
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name required')
        .isLength({ min: 3 })
        .withMessage('Too short category name')
        .isLength({ max: 32 })
        .withMessage('Too long category name'),
    validatorMiddlewares
];

exports.updateCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name required')
        .isLength({ min: 3 })
        .withMessage('Too short category name')
        .isLength({ max: 32 })
        .withMessage('Too long category name'),
    check('id')
        .isMongoId()
        .withMessage('Invalid category id'),
    validatorMiddlewares
];

exports.deleteCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid category id'),
    validatorMiddlewares
];