const { check, body } = require("express-validator");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");
const { default: slugify } = require("slugify");


exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Required name SubCategory')
        .isLength({ min: 2 })
        .withMessage('To short name SubCategory')
        .isLength({ max: 32 })
        .withMessage('To Long name SubCategory')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('category')
        .isMongoId()
        .withMessage('Invalid category id format'),
    validatorMiddlewares
];

exports.getSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid SubCategory id format'),
    validatorMiddlewares
];

exports.updateSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('required id SubCategory'),
    body('name')
        .notEmpty()
        .withMessage('Required name SubCategory')
        .isLength({ min: 2 })
        .withMessage('To short name SubCategory')
        .isLength({ max: 32 })
        .withMessage('To Long name SubCategory')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid category id format'),
    validatorMiddlewares
];

exports.deleteSubCategoryValidator = [
    check('id')
        .notEmpty()
        .withMessage('required id SubCategory')
        .isMongoId()
        .withMessage('Invalid SubCategory id format'),
    validatorMiddlewares
];
