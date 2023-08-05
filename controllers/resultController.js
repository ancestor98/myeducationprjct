const userModel = require('../models/userModel');
const teacherModel = require('../models/teachersModel');
const studentModel = require('../models/studentsModel');
const resultModel = require('../models/resultsModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const cloudinary = require('../utilities/cloudinary');
const { genToken, decodeToken } = require('../utilities/jwt');
const emailSender = require('../middlewares/email');
const { forgetPassEmail } = require('../utilities/studentEmail/forgetpassword')
const { genEmailReg } = require('../utilities/studentEmail/register')
const { link } = require('@hapi/joi');


const createResult = async (req, res)=>{
    try {
        const {
            subName1, subName2, subName3, subName4, subName5, subName6, subName7, subName8, subName9, subName10,
            subTest1, subTest2, subTest3, subTest4, subTest5, subTest6, subTest7, subTest8, subTest9, subTest10,
            subExam1, subExam2, subExam3, subExam4, subExam5, subExam6, subExam7, subExam8, subExam9, subExam10,
            subTotal1, subTotal2, subTotal3, subTotal4, subTotal5, subTotal6, subTotal7, subTotal8, subTotal9, subTotal10,
            resultTotal, teachersRemark
        } = req.body;
        const data = {
            subName1, subName2, subName3, subName4, subName5, subName6, subName7, subName8, subName9, subName10,
            subTest1, subTest2, subTest3, subTest4, subTest5, subTest6, subTest7, subTest8, subTest9, subTest10,
            subExam1, subExam2, subExam3, subExam4, subExam5, subExam6, subExam7, subExam8, subExam9, subExam10,
            subTotal1, subTotal2, subTotal3, subTotal4, subTotal5, subTotal6, subTotal7, subTotal8, subTotal9, subTotal10,
            resultTotal, teachersRemark
        } 
        const { studentId } = req.params;
        const student = await studentModel.findById(studentId).populate('link').populate('results');
        // console.log(student)
        const result = await new resultModel(data);
        result.link = student;
        savedResult = await result.save();
        student.results.push(savedResult);
        student.save();
        if (!result){
            res.status(400).json({
                message: 'Error creating student result'
            })
        } else {
            res.status(201).json({
                message: 'Success creating student result',
                data
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



const allStudentResult = async (req, res)=>{
    try {
        const { studentId } = req.params;
        const student = await studentModel.findById(studentId).populate('link').populate('results');
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}









module.exports = {
    createResult
}