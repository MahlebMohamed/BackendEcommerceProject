const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');

const factory = require('./handlersFactory');
const { uploadImageSingle } = require("../middlewares/uploadImageMiddleware");
const Category = require("../model/categoryModel");


// Upload single image
exports.uploadCategoryImage = uploadImageSingle('image');


// Image processing
exports.resizeImageCategory = asyncHandler(async (req, res, next) => {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/categories/${filename}`);

    req.body.image = filename;

    next();
});

// @desc get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getsAll(Category);


// @desc get category
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);


// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);


// @desc Update category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = factory.updateOne(Category);


// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deletOne(Category);