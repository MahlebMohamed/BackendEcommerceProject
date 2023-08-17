const express = require('express');
const subCategoryRouter = express.Router();

const {
    createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory
} = require('../services/subCategoryService');

const {
    createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator
} = require('../utlis/validators/subCategoryValidator');


subCategoryRouter
    .route('/')
    .post(createSubCategoryValidator, createSubCategory)
    .get(getSubCategories);

subCategoryRouter
    .route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);


module.exports = subCategoryRouter;