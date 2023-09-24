const multer = require("multer");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');

const ApiError = require("../utlis/apiError");
const Product = require("../model/productModel");
const factory = require("./handlersFactory");
const { uploadMixOfImage } = require("../middlewares/uploadImageMiddleware");



exports.uploadProductImage = uploadMixOfImage([
    {
        name: "imageCover",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    }
])

exports.resizeImageProduct = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
        const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/products/${imageCoverFileName}`);

        req.body.imageCover = imageCoverFileName;
    }

    if (req.files.images) {
        req.body.images = [];

        await Promise.all(
            req.files.images.map(async (image, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                await sharp(image.buffer)
                    .resize(600, 600)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/products/${imageName}`);

                req.body.images.push(imageName);
            }));
    }

    next();
});

// @desc get list of products
// @route GET /api/v1/products
// @access Public
exports.getProducts = factory.getsAll(Product, "Product");

// @desc get product
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product);
// .populate({ path: 'category', select: 'name -_id' });

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product);

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(Product);

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deletOne(Product);
