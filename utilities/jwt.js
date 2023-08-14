const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const teacherModel = require('../models/teachersModel');
const studentModel = require('../models/studentsModel');
require('dotenv').config()

// FOR SCHOOLS
const genToken = async (id, time)=>{
    const token = await jwt.sign(
        {
            userID: id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: time
        }
    )
    return token;
};

const decodeToken = async (token)=>{
    let user = null;
    await jwt.verify(token, process.env.JWT_SECRET, async (err, data)=>{
        if(err) {
            // throw err;
            return res.status(200).json({
                message: 'Token Expired, Please try again'
            });
        } else {
            user = await userModel.findById(data.userID);
            console.log(data);
        }
    })
    return user
};





// FOR TEACHERS
const decodeTokenT = async (token)=>{
    let user = null;
    await jwt.verify(token, process.env.JWT_SECRET, async (err, data)=>{
        if(err) {
            // throw err;
            return res.status(200).json({
                message: 'Token Expired, Please try again'
            });
        } else {
            user = await teacherModel.findById(data.userID);
        }
    })
    return user
};




// FOR TEACHERS
const decodeTokenS = async (token)=>{
    let user = null;
    await jwt.verify(token, process.env.JWT_SECRET, async (err, data)=>{
        if(err) {
            // throw err;
            return res.status(200).json({
                message: 'Token Expired, Please try again'
            });
        } else {
            user = await studentModel.findById(data.userID);
        }
    })
    return user
};




module.exports = {
    genToken,
    decodeToken,
    decodeTokenT,
    decodeTokenS
};