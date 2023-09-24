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
    }
);


function setImageUrl(doc) {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
}

// findOne, findAll and update
categorySechma.post('init', (doc) => {
    setImageUrl(doc);
});

// create
categorySechma.post('save', (doc) => {
    setImageUrl(doc);
});



module.exports = mongoose.model('Category', categorySechma);