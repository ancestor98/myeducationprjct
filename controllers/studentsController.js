const userModel = require('../models/userModel');
const teacherModel = require('../models/teachersModel');
const studentModel = require('../models/studentsModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const cloudinary = require('../utilities/cloudinary');
const { genToken, decodeToken } = require('../utilities/jwt');
const emailSender = require('../middlewares/email');


const newStudent = async (req, res)=>{
    try {
        const {
            studentName,
            studentClass,
            studentAge,
            studentEmail,
            pinNumber
        } = req.body;
        const { id } = req.params;
        const teacher = await teacherModel.findById(id).populate('link').populate('students');
        // const studentPassport = req.file.path;
        const studentImage = req.files.studentPassport.tempFilePath
        const uploadImage = await cloudinary.uploader.upload(studentImage);
        const isEmail = await studentModel.findOne({studentEmail});
        if (isEmail) {
            res.status(400).json({
                message: `Student with this Email: ${studentEmail} already exist.`
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(pinNumber, salt);
            const data = {
                studentName: studentName.toUpperCase(),
                studentClass,
                studentAge,
                studentEmail: studentEmail.toLowerCase(),
                pinNumber,
                studentPassport: uploadImage.secure_url
            }
            const student = await new studentModel(data);
            student.link = teacher;
            savedStudent = await student.save();
            teacher.students.push(savedStudent);
            teacher.save();
            // console.log(savedStudent)
            // await fs.unlinkSync(req.file.path);
            const subject = 'ProgressPal - welcome!';
            const message = `Welcome to ProgressPal, we are pleased to have you ${savedStudent.studentName}, as a Student registered with School: ${teacher.link.schoolName} on this Platform to better the education system of Nigeria. Your Teacher ${savedStudent.link.teacherName} will be responsible for your performance/s. Feel free to give us feedback on what needs to be improved on the platform. You can contact us on whatsapp with the Phone Number: +2348100335322. Thank you.`
            emailSender({
                email: studentEmail,
                subject,
                message
            })
            console.log("savedStudent")
            res.status(200).json({
                message: 'Teacher saved successfully',
                data: savedStudent
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// Login
const studentLogin = async (req, res)=>{
    try {
        const { studentEmail, pinNumber } = req.body;
        const user = await studentModel.findOne({studentEmail});
        if (!user) {
            res.status(404).json({
                message: `Student with Email: ${studentEmail} not found.`
            });
        } else {
            console.log(user.pinNumber)
            const isPassword = await bcrypt.compare(pinNumber, user.pinNumber);
            console.log(isPassword)
            if(!isPassword) {
                res.status(400).json({
                    message: 'Incorrect Password'
                })
            } else {
                const token = await genToken(user._id, '30m');
                res.status(200).json({
                    message: 'Log in Successful',
                    token: token
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};






module.exports = {
    newStudent,
    studentLogin
}