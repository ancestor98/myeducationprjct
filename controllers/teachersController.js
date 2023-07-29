const userModel = require('../models/userModel');
const teacherModel = require('../models/teachersModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const cloudinary = require('../utilities/cloudinary');
const { genToken, decodeToken } = require('../utilities/jwt');
const emailSender = require('../middlewares/email');




const newTeacher = async (req, res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        const {
            teacherName,
            teacherClass,
            teacherAge,
            password,
            confirmPassword
        } = req.body;
        const teacherImage = req.file.path;
        const uploadImage = await cloudinary.uploader.upload(teacherImage);
        if (password !== confirmPassword) {
            res.status(400).json({
                message: 'Make sure your Input Password corresponds with your Confirm Password'
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);
            const hashPassword = await bcrypt.hash(password, salt);
            const data = {
                teacherName,
                teacherClass,
                teacherAge,
                password: hashPassword,
                confirmPassword: hashConfirmPassword,
                teacherImage: uploadImage.secure_url
            };
            const teacher = await new teacherModel(data);
            teacher.link = user;
            savedTeacher = await teacher.save();
            user.teachers.push(savedTeacher);
            user.save();
            res.status(200).json({
                message: 'Teacher saved successfully',
                data: savedTeacher
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};









module.exports = {
    newTeacher
}