const mongoose = require("mongoose");

const categorySechma = new mongoose.Schema({
    name: String
});

const categoryModel = mongoose.model('category', categorySechma);

module.exports = categoryModel;