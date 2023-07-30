const Category = require("../model/categoryModel");
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');


// @desc get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (request, response) => {
    const page = request.query.page * 1 || 1;
    const limit = request.query.limit * 1 || 4;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}).skip(skip).limit(limit);
    response.status(200).json({ results: categories.length, page, data: categories });
});


// @desc get category
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (request, response) => {
    const { id } = request.params;

    const category = await Category.findById({ _id: id });
    if (!category) {
        response.status(404).json({ msg: `Not category for this id ${id}` });
    }
    response.status(200).json(category);
});


// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (request, response) => {
    const { name } = request.body;

    const category = await Category.create({ name, slug: slugify(name) });
    response.status(201).json({ data: category });
});


// @desc Update category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    const category = await Category.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );
    if (!category) {
        response.status(404).json({ msg: `Not category for this id ${id}` });
    }
    response.status(200).json(category);
})


// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (request, response) => {
    const { id } = request.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        response.status(404).json({ msg: `Not category for this id ${id}` });
    }
    response.status(204).send();
})