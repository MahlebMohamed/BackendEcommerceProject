const asyncHandler = require("express-async-handler");
const Brand = require('../model/brandModel');
const { default: slugify } = require("slugify");
const ApiError = require("../utlis/apiError");


// @desc create brand
// @route POST /api/v1/brands
// @access Public
exports.createBrand = asyncHandler(async (request, response, next) => {
    const { name } = request.body;

    const brand = await Brand.create({ name, slug: slugify(name) });
    response.status(201).json({ data: brand })
});


// @desc get list of brand
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (request, response, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const brand = await Brand.find({}).skip(skip).limit(limit);
    if (!brand) {
        next(new ApiError(`Not category for this id ${id}`, 404))
    }
    response.status(200).json({ data: brand })
});


// @desc get list of brand
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (request, response, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const brand = await Brand.find({}).skip(skip).limit(limit);
    if (!brand) {
        next(new ApiError(`Not category for this id ${id}`, 404))
    }
    response.status(200).json({ data: brand })
});


// @desc get of brand
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const brand = await Brand.findById(id);
    if (!brand) {
        next(new ApiError(`Not category for this id ${id}`, 404))
    }
    response.status(200).json({ data: brand })
});


// @desc update brand
// @route PUT /api/v1/brands/:id
// @access Public
exports.updateBrand = asyncHandler(async (request, response, next) => {
    const { id } = request.params;
    const { name } = request.body;

    const brand = await Brand.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );
    if (!brand) {
        next(new ApiError(`Not category for this id ${id}`, 404))
    }
    response.status(200).json({ data: brand })
});


// @desc delete brand
// @route DELETE /api/v1/brands/:id
// @access Public
exports.deleteBrand = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
        next(new ApiError(`Not category for this id ${id}`, 404))
    }
    response.status(200).json({ data: brand })
});
