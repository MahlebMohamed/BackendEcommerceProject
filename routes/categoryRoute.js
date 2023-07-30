const express = require('express');
const categoryRouter = express.Router();

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../services/categoryService');


categoryRouter.route('/').get(getCategories).post(createCategory);
categoryRouter.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);


module.exports = categoryRouter;