const mongoose = require("mongoose");

const categorySechma = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'Category must be unique'],
            minlength: [3, 'Too short category name'],
            maxlength: [32, 'Too long category name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    });

const Category = mongoose.model('Category', categorySechma);

module.exports = Category;