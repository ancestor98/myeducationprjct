// Importing my AuthMiddlwares.
const {
    userAuthSchool,
    isAdminAuthorizedSchool,
    isSuperAdminAuthorizedSchool,
    loginAuthSchool,
    userAuth
} = require('../middlewares/AuthandAuth/schoolAuthMiddleware')
const {
    userAuthTeacher,
    isAdminAuthorizedTeacher,
    isSuperAdminAuthorizedTeacher,
    loginAuthTeacher,
    userAuthT
} = require('../middlewares/AuthandAuth/teacherAuthMiddleware');
const {
    userAuthStudent,
    isAdminAuthorizedStudent,
    isSuperAdminAuthorizedStudent,
    loginAuthStudent,
    userAuthS
} = require('../middlewares/AuthandAuth/studentAuthMiddleware')


// Importing my Validators
const {
    validateInputsMiddleware,
    verifyEmailVal,
    loginVal,
    changePassVal,
    forgotPassVal,
    teacherEmailVal,
    updateUserInfoMiddleware
} = require('../middlewares/userValidate')
const {
    
    validateteacher,
    loginValTeacher,
    changePassValTeacher,
    forgotPassValTeacher,
    updateTeacherInfoMiddleware
} = require('../middlewares/teacherValidate');
const {
    validateStudent,
    loginValStudent,
    changePassValStudent,
    updateStudentInfoMiddleware
} = require('../middlewares/studentValidate')


// Importing my Controllers
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




//  RESULTS
const {
    createResult,
    studentAllResult,
    allResults,
    oneResult,
    updateResult,
    deleteResult
} = require('../controllers/resultController');
const upload = require('../utilities/multer');

const express = require('express');
const route = express.Router();


// Route for Schools Admin Alone.
route.post('/register', validateInputsMiddleware, register)
route.put('/verify/:token', verifyEmail)
route.put('/re-verify', verifyEmailVal, resendEmailVerification)
route.post('/login', loginVal, logIn)
route.post('/logout/:schoolId', loginAuthSchool, signOut)
route.put("/changePassword/:schoolId", userAuth, changePassVal, changePassword);
route.post("/forgot-password", forgotPassVal, forgotPassword);
route.put("/reset-password/:token", changePassVal, resetPassword);
route.put('/updateSchool/:schoolId', userAuth, updateUserInfoMiddleware, updateSchool)
route.delete('/deleteSchool/:schoolId', userAuth, deleteSchool)
route.post('/teacherLink/:schoolId', userAuth, teacherEmailVal, teacherLink)
route.get('/readAllSchools', userAuth, readAllSchools);
route.get('/readOneSchool/:schoolId', userAuth, readOneSchool);


// Route for Teachers Alone.
route.post('/newTeacher/:token', validateteacher, newTeacher)
route.post('/loginTeacher', loginValTeacher, teacherLogin)
route.post('/logoutTeacher/:teacherId', userAuthT, signOutTeacher)
route.put("/changePasswordTeacher/:teacherId", userAuthT, changePassValTeacher, changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPassValTeacher, forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:token", changePassValTeacher, resetPasswordTeacher);
route.put('/updateTeacher/:teacherId', userAuthT, updateTeacherInfoMiddleware, updateSchoolTeacher)
route.delete('/deleteTeacher/:teacherId', userAuthT, deleteSchoolTeacher)
route.get('/readAllTeachers', userAuthT, readAllTeachers);
route.get('/readOneTeacher/:teacherId', userAuthT,  readOneTeacher);



// Route for Students Alone.
route.post('/newStudent/:teacherId', userAuthT, validateStudent, newStudent)
route.post('/loginStudent', loginValStudent, studentLogin)
route.post('/logoutStudent/:studentId', userAuthS, loginAuthStudent, signOutStudent)
route.put("/changePasswordStudent/:studentId", userAuthS, changePassValStudent, changePasswordStudent);
route.post("/forgot-passwordStudent", forgotPasswordStudent);
route.put("/reset-passwordStudent/:studentId/:token", changePassValStudent, resetPasswordStudent);
route.put('/updateStudent/:studentId', userAuthS, updateStudentInfoMiddleware, updateSchoolStudent);
route.delete('/deleteStudent/:studentId', userAuthS, deleteSchoolStudent);
route.get('/readAllStudent', readAllStudent);
route.get('/readOneStudent/:studentId', readOneStudent);


// Route for results Alone.
route.post('/addResult/:studentId', createResult);
route.get('/studentResult/:studentId', studentAllResult);
route.get('/allResults', allResults);
route.get('/oneResult/:resultId', oneResult);
route.put('/updateResult/:resultId', updateResult)
route.delete('/deleteResult/:studentId/:resultId', deleteResult)


module.exports = { route };