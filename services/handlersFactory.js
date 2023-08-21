const asyncHandler = require("express-async-handler");
const ApiError = require("../utlis/apiError");
const ApiFeatures = require("../utlis/apiFeatures");


exports.deletOne = (Model) => asyncHandler(async (request, response, next) => {
    const { id } = request.params;

    const document = await Model.findByIdAndDelete(id);
    if (!document) {
        next(new ApiError(`Not for this id ${id}`, 404))
    }
    response.status(200).json({ data: document })
});


exports.updateOne = (Model) => asyncHandler(async (request, response, next) => {
    const document = await Model.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    );
    if (!document) {
        next(new ApiError(`Not for this id ${id}`, 404))
    }
    response.status(200).json({ data: document })
});


exports.createOne = (Model) => asyncHandler(async (request, response) => {
    const document = await Model.create(request.body);
    response.status(201).json({ data: document });
});


exports.getOne = (Model) => asyncHandler(async (request, response, next) => {
    const document = await Model.findById(request.params.id)
    if (!document) {
        return next(new ApiError(`Not for this id ${id}`, 404));
    }
    response.status(200).json({ data: document });
});


exports.getsAll = (Model, modelName = '') => asyncHandler(async (request, response, next) => {
    let filter = {};
    if (request.filterObject)
        filter = request.filterObject;

    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), request.query)
        .paginate(documentsCount)
        .filter()
        .sort()
        .search(modelName)
        .fields();

    const { mongooseQuery, paginationResult } = apiFeatures

    const document = await mongooseQuery;
    response.status(200).json({ results: document.length, paginationResult, data: document });
});