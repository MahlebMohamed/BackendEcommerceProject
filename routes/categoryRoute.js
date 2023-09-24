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
    uploadCategoryImage,
    resizeImageCategory,
} = require('../services/categoryService');

const subCategoryRouter = require('./subCategoryRoute');



categoryRouter
    .route('/')
    .get(getCategories)
    .post(uploadCategoryImage, resizeImageCategory, createCategoryValidator, createCategory);


categoryRouter
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(uploadCategoryImage, resizeImageCategory, updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

categoryRouter
    .use('/:categoryId/subcategories', subCategoryRouter)

module.exports = categoryRouter;