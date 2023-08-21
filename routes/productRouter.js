const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../services/productService');
const { deleteProductValidator, updateProductValidator, getProductValidator, createProductValidator } = require('../utlis/validators/productValidator');
const productRouter = express.Router();


productRouter
    .route('/')
    .get(getProducts)
    .post(createProductValidator, createProduct);

productRouter
    .route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);


module.exports = productRouter;