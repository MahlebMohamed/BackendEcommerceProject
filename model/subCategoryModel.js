const mongoose = require("mongoose");

const subCategorySechma = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            minlength: [3, "Too short subCategory name"],
            maxlength: [32, "Too long subCategory name"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [true, "SubCategory must belong to parent category"],
        },
    },
    {
        timestamps: true,
    }
);

const SubCategory = mongoose.model("SubCategory", subCategorySechma);

module.exports = SubCategory;
