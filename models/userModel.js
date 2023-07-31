const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, 'School name is Required'],
        unique: true
    },
    schoolEmail: {
        type: String,
        required: [true, 'School Email is required']
    },
    schoolAddress: {
        type: String,
        required: [true, 'School address is Required']
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    schoolLogo: {
        type: String
    },
    regNo: {
        type: String,
        unique: true,
        default: 0
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Password is Required']
    },
    website: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    }]
}, {timestamps: true})

const userModel = mongoose.model('UserInfo', userSchema);

module.exports = userModel;