const mongoose = require("mongoose");


const brandSechma = mongoose.Schema(
    {
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
}
);


function setImageUrl(doc) {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
}

// findOne, findAll and update
brandSechma.post('init', (doc) => {
    setImageUrl(doc);
});

// create
brandSechma.post('save', (doc) => {
    setImageUrl(doc);
});


module.exports = mongoose.model('Brand', brandSechma);