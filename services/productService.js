const Product = require("../model/productModel");
const factory = require('./handlersFactory');


// @desc get list of products
// @route GET /api/v1/products
// @access Public
exports.getProducts = factory.getsAll(Product, 'Product');


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