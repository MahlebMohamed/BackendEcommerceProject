const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');

const factory = require('./handlersFactory');
const { uploadImageSingle } = require("../middlewares/uploadImageMiddleware");
const User = require("../model/userModel");


// Upload single image
exports.uploadUserImage = uploadImageSingle('profileImg');


// Image processing
exports.resizeImageUser = asyncHandler(async (req, res, next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/users/${filename}`);

        req.body.profileImg = filename;
    }

    next();
});

// @desc get list of users
// @route GET /api/v1/users
// @access Private
exports.getUsers = factory.getsAll(User);


// @desc get user
// @route GET /api/v1/users/:id
// @access Private
exports.getUser = factory.getOne(User);


// @desc Create user
// @route POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User);


// @desc Update user
// @route PUT /api/v1/users/:id
// @access Private
exports.updateUser = factory.updateOne(User);


// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deletOne(User);