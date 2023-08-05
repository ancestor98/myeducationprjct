const {
    validateUser,
    verifyEmailVal,
    loginVal,
    changePassVal,
    forgotPassVal,
    teacherEmailVal,
    validateUpdateUser
} = require('../middlewares/userValidate');
const {
    
    validateteacher,
    loginValTeacher,
    changePassValTeacher,
    forgotPassValTeacher,
    validateUpdateteacher
} = require('../middlewares/teacherValidate');
const {
    validateStudent,
    loginValStudent,
    changePassValStudent,
    forgotPassValStudent,
    validateUpdateStudent
} = require('../middlewares/studentValidate')
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
// route.post('/register', validateUser, register)
route.post('/register', validateUser, register)
route.put('/verify/:id/:token', verifyEmail)
route.put('/re-verify', verifyEmailVal, resendEmailVerification)
route.post('/login', loginVal, logIn)
route.post('/logout/:id', signOut)
route.put("/changePassword/:id", changePassVal, changePassword);
route.post("/forgot-password", forgotPassVal, forgotPassword);
route.put("/reset-password/:id/:token", changePassVal, resetPassword);
route.put('/updateSchool/:id', validateUpdateUser, updateSchool)
route.delete('/deleteSchool/:id', deleteSchool)
route.post('/teacherLink/:id', teacherEmailVal, teacherLink)
route.get('/readAllSchools', readAllSchools);
route.get('/readOneSchool/:schoolId', readOneSchool);


// Route for Teachers Alone.
// route.post('/newTeacher/:id/:token', upload.single('teacherImage'), newTeacher)
route.post('/newTeacher/:id/:token', validateteacher, newTeacher)
route.post('/loginTeacher', loginValTeacher, teacherLogin)
route.post('/logoutTeacher/:id', signOutTeacher)
route.put("/changePasswordTeacher/:id", changePassValTeacher, changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPassValTeacher, forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:id/:token", changePassValTeacher, resetPasswordTeacher);
route.put('/updateTeacher/:id', validateUpdateteacher, updateSchoolTeacher)
route.delete('/deleteTeacher/:id', deleteSchoolTeacher)
route.get('/readAllTeachers', readAllTeachers);
route.get('/readOneTeacher/:teacherId', readOneTeacher);



// Route for Students Alone.
route.post('/newStudent/:id', validateStudent, newStudent)
route.post('/loginStudent', loginValStudent, studentLogin)
route.post('/logoutStudent/:id', signOutStudent)
route.put("/changePasswordStudent/:id", changePassValStudent, changePasswordStudent);
route.post("/forgot-passwordStudent", forgotPassValStudent, forgotPasswordStudent);
route.put("/reset-passwordStudent/:id/:token", changePassValStudent, resetPasswordStudent);
route.put('/updateStudent/:id', validateUpdateStudent, updateSchoolStudent);
route.delete('/deleteStudent/:id', deleteSchoolStudent);
route.get('/readAllStudent', readAllStudent);
route.get('/readOneStudent/:studentId', readOneStudent);




module.exports = { route };