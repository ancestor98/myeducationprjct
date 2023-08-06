require('dotenv').config();
const jwt = require('jsonwebtoken');

// Gen-Token Function for Schools/Users.
const genTokenLogin = async(user)=>{
    const token = await jwt.sign({
        userId: user._id,
        schoolName: user.schoolName,
        schoolEmail: user.schoolEmail
    }, process.env.JWT_SECRET, {expiresIn: '1d'})
    return token
};
const genTokensignUp = async(user)=>{
    const token = await jwt.sign({
        userId: user._id,
        schoolName: user.schoolName,
        schoolEmail: user.schoolEmail
    }, process.env.JWT_SECRET, {expiresIn: '50d'})
    return token
};



// Gen-Token Function for Teachers.
const genTokenLoginT = async(user)=>{
    const token = await jwt.sign({
        userId: user._id,
        teacherName: user.teacherName,
        teacherEmail: user.teacherEmail
    }, process.env.JWT_SECRET, {expiresIn: '1d'})
    return token
};
const genTokensignUpT = async(teacher)=>{
    const token = await jwt.sign({
        userId: teacher._id,
        teacherName: teacher.teacherName,
        teacherEmail: teacher.teacherEmail
    }, process.env.JWT_SECRET, {expiresIn: '50d'})
    return token
};



// Gen-Token Function for Students.
const genTokenLoginS = async(user)=>{
    const token = await jwt.sign({
        userId: user._id,
        studentName: user.studentName,
        studentEmail: user.studentEmail
    }, process.env.JWT_SECRET, {expiresIn: '1d'})
    return token
};
const genTokensignUpS = async(student)=>{
    const token = await jwt.sign({
        userId: student._id,
        studentName: student.studentName,
        studentEmail: student.studentEmail
    }, process.env.JWT_SECRET, {expiresIn: '50d'})
    return token
};






module.exports = {
    genTokenLogin,
    genTokensignUp,
    genTokenLoginT,
    genTokensignUpT,
    genTokenLoginS,
    genTokensignUpS
}