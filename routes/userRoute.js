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




// Route for Teachers Alone.
route.post('/newTeacher/:id/:token', upload.single('teacherImage'), newTeacher)
route.post('/loginTeacher', teacherLogin)
route.post('/logoutTeacher/:id', signOutTeacher)
route.put("/changePasswordTeacher/:id", changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:id/:token", resetPasswordTeacher);
route.put('/updateTeacher/:id', upload.single('teacherImage'), updateSchoolTeacher)
route.delete('/deleteTeacher/:id', deleteSchoolTeacher)



// Route for Students Alone.
route.post('/newStudent/:id', upload.single('studentPassport'), newStudent)




module.exports = { route };