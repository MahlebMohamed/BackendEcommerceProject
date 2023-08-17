const SubCategory = require("../model/subCategoryModel");
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require("../utlis/apiError");
const Category = require("../model/categoryModel");


exports.setCategoryIdToBody = (request, response, next) => {
    if (!request.body.category) request.body.category = request.params.categoryId;

    next();
};

exports.createFilterObject = (request, response, next) => {
    let filterObject = {};
    if (request.params.categoryId)
        filterObject = { category: request.params.categoryId }
    request.filterObject = filterObject;

    next();
};

// @desc Create subCategories
// @route POST /api/v1/subCategories
// @access Private
exports.createSubCategory = asyncHandler(async (request, response, next) => {
    const { name, category } = request.body;

    const subCategory = await SubCategory.create({ name, slug: slugify(name), category });
    response.status(201).json({ data: subCategory });
});


// @desc get subCategories
// @route get /api/v1/subCategories
// @access Private
exports.getSubCategories = asyncHandler(async (request, response, next) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 15;
    const skip = (page - 1) * limit;

    const subCategories = await SubCategory.find(request.filterObject).skip(skip).limit(limit)
    // .populate(
    //     { path: 'category', select: 'name -_id' }
    // ); POUR AFFICHE LE NOM DE CATEGORY DANS CHAQUE SUBCATEGORY
    response.status(200).json({ results: subCategories.length, page, data: subCategories });
});


// @desc get subCategory
// @route get /api/v1/subCategories
// @access Private
exports.getSubCategory = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const subCategory = await SubCategory.findById(id)
    if (!subCategory) {
        return next(new ApiError(`Not SubCategory for this id ${id}`, 404));
    }
    response.status(200).json({ data: subCategory });
});


// @desc update subCategory
// @route put /api/v1/subCategories
// @access Private
exports.updateSubCategory = asyncHandler(async (request, response, next) => {
    const { id } = request.params;
    const { name, category } = request.body;

    const subCategory = await SubCategory.findByIdAndUpdate(
        { _id: id },
        { name, category, slug: slugify(name) },
        { new: true }
    );
    if (!subCategory) {
        return next(new ApiError(`Not SubCategory for this id ${id}`, 404));
    }
    response.status(200).json({ data: subCategory });
});


// @desc update subCategory
// @route put /api/v1/subCategories
// @access Private
exports.deleteSubCategory = asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
        return next(new ApiError(`Not SubCategory for this id ${id}`, 404));
    }
    response.status(200).json({ data: subCategory });
});