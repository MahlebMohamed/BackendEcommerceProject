const express = require("express");
const {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImageBrand,
} = require("../services/brandService");
const {
    createBrandValidator,
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require("../utlis/validators/brandValidator");
const brandRouter = express.Router();

brandRouter
    .route("/")
    .get(getBrands)
    .post(uploadBrandImage, resizeImageBrand, createBrandValidator, createBrand);

brandRouter
    .route("/:id")
    .get(getBrandValidator, getBrand)
    .put(uploadBrandImage, resizeImageBrand, updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand);

module.exports = brandRouter;
