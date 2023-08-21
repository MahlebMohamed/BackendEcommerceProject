const { check } = require("express-validator");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");
const { default: slugify } = require("slugify");

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
        .withMessage('Too long category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddlewares
];

exports.updateCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name required')
        .isLength({ min: 3 })
        .withMessage('Too short category name')
        .isLength({ max: 32 })
        .withMessage('Too long category name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
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