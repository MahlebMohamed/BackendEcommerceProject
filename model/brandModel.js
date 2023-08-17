const mongoose = require("mongoose");


const brandSechma = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'brand name unique'],
        required: [true, 'brand name required'],
        minlength: [2, 'brand name minimum length'],
        maxlength: [32, 'brand name maximum length']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
});

const Brand = mongoose.model('Brand', brandSechma);

module.exports = Brand;