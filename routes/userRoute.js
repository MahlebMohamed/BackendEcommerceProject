const express = require("express");

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    uploadUserImage,
    resizeImageUser,
} = require("../services/userService");
const {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
} = require("../utlis/validators/userValidator");

const userRouter = express.Router();

userRouter
    .route("/")
    .get(getUsers)
    .post(uploadUserImage, resizeImageUser, createUserValidator, createUser);

userRouter
    .route("/:id")
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImageUser, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

module.exports = userRouter;
