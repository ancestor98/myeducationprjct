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
    teacherLink,
    readAllSchools,
    readOneSchool
} = require('../controllers/userController');
const {
    newTeacher,
    teacherLogin,
    changePasswordTeacher,
    forgotPasswordTeacher,
    resetPasswordTeacher,
    updateSchoolTeacher,
    deleteSchoolTeacher,
    signOutTeacher,
    readAllTeachers,
    readOneTeacher
} = require('../controllers/teachersController')
const { 
    newStudent,
    studentLogin,
    changePasswordStudent,
    forgotPasswordStudent,
    resetPasswordStudent,
    updateSchoolStudent,
    deleteSchoolStudent,
    signOutStudent,
    readAllStudent,
    readOneStudent
} = require('../controllers/studentsController');
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
route.get('/readAllSchools', readAllSchools);
route.get('/readOneSchool/:schoolId', readOneSchool);


// Route for Teachers Alone.
// route.post('/newTeacher/:id/:token', upload.single('teacherImage'), newTeacher)
route.post('/newTeacher/:id/:token', newTeacher)
route.post('/loginTeacher', teacherLogin)
route.post('/logoutTeacher/:id', signOutTeacher)
route.put("/changePasswordTeacher/:id", changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:id/:token", resetPasswordTeacher);
route.put('/updateTeacher/:id', updateSchoolTeacher)
route.delete('/deleteTeacher/:id', deleteSchoolTeacher)
route.get('/readAllTeachers', readAllTeachers);
route.get('/readOneTeacher/:teacherId', readOneTeacher);



// Route for Students Alone.
route.post('/newStudent/:id', newStudent)
route.post('/loginStudent', studentLogin)
route.post('/logoutStudent/:id', signOutStudent)
route.put("/changePasswordStudent/:id", changePasswordStudent);
route.post("/forgot-passwordStudent", forgotPasswordStudent);
route.put("/reset-passwordStudent/:id/:token", resetPasswordStudent);
route.put('/updateStudent/:id', updateSchoolStudent);
route.delete('/deleteStudent/:id', deleteSchoolStudent);
route.get('/readAllStudent', readAllStudent);
route.get('/readOneStudent/:studentId', readOneStudent);




module.exports = { route };