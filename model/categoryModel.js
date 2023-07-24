const mongoose = require("mongoose");

const categorySechma = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category required'],
            unique: [true, 'Category must be unique'],
            minlength: [3, 'Too short category name'],
            maxlength: [32, 'Too long category name'],
        },
        slug: {
            type: String,
            lowercase: true,
        }
    },
    {
        timestamps: true
    });

const categoryModel = mongoose.model('category', categorySechma);

module.exports = categoryModel;