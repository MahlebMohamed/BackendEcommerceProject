const express = require('express');
const categoryRouter = express.Router();
const multer = require('multer');

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

const upload = multer({ dest: 'uploads/categories' });


categoryRouter
    .route('/')
    .get(getCategories)
    .post(upload.single('image'), (req, res, next) => {
        console.log(req.file);
        next();
    }, createCategoryValidator, createCategory);


categoryRouter
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

categoryRouter
    .use('/:categoryId/subcategories', subCategoryRouter)

module.exports = categoryRouter;