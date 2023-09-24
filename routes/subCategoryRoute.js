const express = require("express");
const subCategoryRouter = express.Router({ mergeParams: true });

const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject,
} = require("../services/subCategoryService");

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require("../utlis/validators/subCategoryValidator");

subCategoryRouter
    .route("/")
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObject, getSubCategories);

subCategoryRouter
    .route("/:id")
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = subCategoryRouter;
