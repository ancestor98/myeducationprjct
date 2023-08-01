const validateUser = require('../middlewares/userValidate');
const {
    register,
    verifyEmail,
    resendEmailVerification,
    logIn,
    signOut,
    changePassword,
    forgotPassword,
    resetPassword,
    updateSchool,
    deleteSchool,
    teacherLink
} = require('../controllers/userController');
const {
    newTeacher,
    teacherLogin,
    changePasswordTeacher,
    forgotPasswordTeacher,
    resetPasswordTeacher,
    updateSchoolTeacher,
    deleteSchoolTeacher,
    signOutTeacher
} = require('../controllers/teachersController')
const { newStudent } = require('../controllers/studentsController');
const upload = require('../utilities/multer');

const express = require('express');
const route = express.Router();


// Route for Schools Admin Alone.
// route.post('/register', upload.single('schoolLogo'), validateUser, register)
route.post('/register', validateUser, register)
route.put('/verify/:id/:token', verifyEmail)
route.put('/re-verify', resendEmailVerification)
route.post('/login', logIn)
route.post('/logout/:id', signOut)
route.put("/changePassword/:id", changePassword);
route.post("/forgot-password", forgotPassword);
route.put("/reset-password/:id/:token", resetPassword);
route.put('/updateSchool/:id', upload.single('schoolLogo'), updateSchool)
route.delete('/deleteSchool/:id', deleteSchool)
route.post('/teacherLink/:id', teacherLink)


// http://progresspal-8rxj.onrender.com/progressPal/newTeacher/64c8b9fed81e56d697e2eb93/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGM4YjlmZWQ4MWU1NmQ2OTdlMmViOTMiLCJpYXQiOjE2OTA4Nzc1MzEsImV4cCI6MTY5MDg3OTMzMX0.QzlueGbYFH1ngNnLYmw--1RDbWWfeiI8IYA3D4D9EQg

// Route for Teachers Alone.
// route.post('/newTeacher/:id/:token', upload.single('teacherImage'), newTeacher)
route.post('/newTeacher/:id/:token', newTeacher)
route.post('/loginTeacher', teacherLogin)
route.post('/logoutTeacher/:id', signOutTeacher)
route.put("/changePasswordTeacher/:id", changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:id/:token", resetPasswordTeacher);
// route.put('/updateTeacher/:id', upload.single('teacherImage'), updateSchoolTeacher)
route.put('/updateTeacher/:id', updateSchoolTeacher)
route.delete('/deleteTeacher/:id', deleteSchoolTeacher)



// Route for Students Alone.
route.post('/newStudent/:id', upload.single('studentPassport'), newStudent)




module.exports = { route };