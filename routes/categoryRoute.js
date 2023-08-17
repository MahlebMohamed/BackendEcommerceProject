const express = require('express');
const categoryRouter = express.Router();

const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utlis/validators/categoryValidator');

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../services/categoryService');

const subCategoryRouter = require('./subCategoryRoute');


categoryRouter
    .route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);


categoryRouter
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

categoryRouter
    .use('/:categoryId/subcategories', subCategoryRouter)

module.exports = categoryRouter;