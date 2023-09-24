const multer = require("multer");
const ApiError = require("../utlis/apiError");

function multerOption() {
    // const multerStorage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/categories');
    //     },
    //     filename: function (req, file, cb) {
    //         const ext = file.mimetype.split('/')[1];
    //         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    //         cb(null, filename);
    //     },
    // });

    const multerStorage = multer.memoryStorage();
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.split('/')[0] === 'image') {
            cb(null, true);
        } else {
            cb(new ApiError('Only image allowed', 400), false);
        }
    }

    return multer({ storage: multerStorage, fileFilter: multerFilter });
}


exports.uploadImageSingle = (fieldName) => {
    return multerOption().single(fieldName);
}

exports.uploadMixOfImage = (arrayOfFildes) => {
    return multerOption().fields(arrayOfFildes);
}