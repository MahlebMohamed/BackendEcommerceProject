const Brand = require('../model/brandModel');
const factory = require('./handlersFactory');


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