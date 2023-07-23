const express = require('express');
const { getCategory } = require('../services/categoryService');
const categoryRouter = express.Router();

categoryRouter.post('/', getCategory);


module.exports = categoryRouter;