const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategories } = require('../services/categoryService');
const categoryRouter = express.Router();


// categoryRouter.post('/', createCategory);
// categoryRouter.get('/', getCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

categoryRouter.route('/').get(getCategories).post(createCategory)


module.exports = categoryRouter;