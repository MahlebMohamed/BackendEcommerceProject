const categoryModel = require("../model/categoryModel");
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');


// @desc get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (request, response) => {

    const categories = await categoryModel.find({})
    response.status(200).json({ results: categories.length, data: categories });
});


// @desc Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (request, response) => {
    const { name } = request.body;

    const category = await categoryModel.create({ name, slug: slugify(name) })
    response.status(201).json({ data: category });
});

exports.updateCategory = async (request, response) => {
    const id = request.params.id;
    const name = request.body.name;

    try {
        const category = await categoryModel.findByIdAndUpdate({ _id: id }, { name, slug: slugify(request.body.name) }, { new: true })
        response.status(200).json(category);
    } catch (err) {
        response.status(500).json(err);
    }
}

exports.deleteCategory = async (request, response) => {
    const { id } = request.params;

    try {
        const category = await categoryModel.findByIdAndDelete(id)
        if (!category) {
            return response.status(404).json({ message: 'ERREUR' });
        }
        return response.status(200).json(category);
    } catch (err) {
        response.status(500).json(err);
    }
}
