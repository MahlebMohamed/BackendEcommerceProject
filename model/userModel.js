const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        require: [true, 'name required'],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        require: [true, 'email required'],
        unique: true,
        lowercase: true
    },
    phone: String,
    profileImg: String,
    password: {
        type: String,
        require: [true, 'password required'],
        minlength: [true, 'Too short password']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;