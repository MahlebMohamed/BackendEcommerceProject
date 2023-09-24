const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');

const Brand = require('../model/brandModel');
const factory = require('./handlersFactory');
const { uploadImageSingle } = require("../middlewares/uploadImageMiddleware");


// Upload single image
exports.uploadBrandImage = uploadImageSingle('image');


// Image processing
exports.resizeImageBrand = asyncHandler(async (req, res, next) => {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/brands/${filename}`);

    req.body.image = filename;

    next();
});

// @desc create brand
// @route POST /api/v1/brands
// @access Public
exports.createBrand = factory.createOne(Brand);


// @desc get list of brand
// @route GET /api/v1/brands
// @access Public
exports.getBrands = factory.getsAll(Brand);


// @desc get of brand
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @desc update brand
// @route PUT /api/v1/brands/:id
// @access Public
exports.updateBrand = factory.updateOne(Brand);


// @desc delete brand
// @route DELETE /api/v1/brands/:id
// @access Public
exports.deleteBrand = factory.deletOne(Brand);