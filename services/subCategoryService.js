const SubCategory = require("../model/subCategoryModel");
const factory = require('./handlersFactory');


exports.setCategoryIdToBody = (request, response, next) => {
    if (!request.body.category)
        request.body.category = request.params.categoryId;

    next();
};

exports.createFilterObject = (request, response, next) => {
    let filterObject = {};
    if (request.params.categoryId)
        filterObject = { category: request.params.categoryId }

    request.filterObject = filterObject;
    next();
};


// @desc get subCategories
// @route get /api/v1/subCategories
// @access Private
exports.getSubCategories = factory.getsAll(SubCategory);
// .populate(
//     { path: 'category', select: 'name -_id' }
// ); POUR AFFICHE LE NOM DE CATEGORY DANS CHAQUE SUBCATEGORY


// @desc get subCategory
// @route get /api/v1/subCategories
// @access Private
exports.getSubCategory = factory.getOne(SubCategory);


// @desc Create subCategories
// @route POST /api/v1/subCategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);


// @desc update subCategory
// @route put /api/v1/subCategories
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);


// @desc update subCategory
// @route put /api/v1/subCategories
// @access Private
exports.deleteSubCategory = factory.deletOne(SubCategory);