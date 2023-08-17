const { check } = require("express-validator");
const validatorMiddlewares = require("../../middlewares/validatorMiddlewares");


exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Required name SubCategory')
        .isLength({ min: 2 })
        .withMessage('To short name SubCategory')
        .isLength({ max: 32 })
        .withMessage('To Long name SubCategory'),
    check('category')
        .notEmpty()
        .withMessage('SubCategory must belong to parent category')
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
    check('name')
        .notEmpty()
        .withMessage('Required name SubCategory')
        .isLength({ min: 2 })
        .withMessage('To short name SubCategory')
        .isLength({ max: 32 })
        .withMessage('To Long name SubCategory'),
    check('category')
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
