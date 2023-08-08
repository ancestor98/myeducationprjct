// Importing my AuthMiddlwares.
const {
    userAuthSchool,
    isAdminAuthorizedSchool,
    isSuperAdminAuthorizedSchool,
    loginAuthSchool
} = require('../middlewares/AuthandAuth/schoolAuthMiddleware')
const {
    userAuthTeacher,
    isAdminAuthorizedTeacher,
    isSuperAdminAuthorizedTeacher,
    loginAuthTeacher
} = require('../middlewares/AuthandAuth/teacherAuthMiddleware');
const {
    userAuthStudent,
    isAdminAuthorizedStudent,
    isSuperAdminAuthorizedStudent,
    loginAuthStudent
} = require('../middlewares/AuthandAuth/studentAuthMiddleware')


// Importing my Validators
const {
    validateInputsMiddleware,
    verifyEmailVal,
    loginVal,
    changePassVal,
    forgotPassVal,
    teacherEmailVal
} = require('../middlewares/userValidate')
const {
    
    validateteacher,
    loginValTeacher,
    changePassValTeacher,
    forgotPassValTeacher
} = require('../middlewares/teacherValidate');
const {
    validateStudent,
    loginValStudent,
    changePassValStudent
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
route.put('/verify/:schoolId/:token', verifyEmail)
route.put('/re-verify', verifyEmailVal, resendEmailVerification)
route.post('/login', loginVal, logIn)
route.post('/logout/:schoolId', loginAuthSchool, signOut)
route.put("/changePassword/:schoolId", changePassVal, changePassword);
route.post("/forgot-password", forgotPassVal, forgotPassword);
route.put("/reset-password/:schoolId/:token", changePassVal, resetPassword);
route.put('/updateSchool/:schoolId', updateSchool)
route.delete('/deleteSchool/:schoolId', deleteSchool)
route.post('/teacherLink/:schoolId', teacherEmailVal, teacherLink)
route.get('/readAllSchools', readAllSchools);
route.get('/readOneSchool/:schoolId', readOneSchool);


// Route for Teachers Alone.
route.post('/newTeacher/:schoolId/:token', validateteacher, newTeacher)
route.post('/loginTeacher', loginValTeacher, teacherLogin)
route.post('/logoutTeacher/:teacherId', loginAuthTeacher, signOutTeacher)
route.put("/changePasswordTeacher/:teacherId", changePassValTeacher, changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPassValTeacher, forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:teacherId/:token", changePassValTeacher, resetPasswordTeacher);
route.put('/updateTeacher/:teacherId', updateSchoolTeacher)
route.delete('/deleteTeacher/:teacherId', deleteSchoolTeacher)
route.get('/readAllTeachers', readAllTeachers);
route.get('/readOneTeacher/:teacherId', readOneTeacher);



// Route for Students Alone.
route.post('/newStudent/:teacherId', validateStudent, newStudent)
route.post('/loginStudent', loginValStudent, studentLogin)
route.post('/logoutStudent/:studentId', loginAuthStudent, signOutStudent)
route.put("/changePasswordStudent/:studentId", changePassValStudent, changePasswordStudent);
route.post("/forgot-passwordStudent", forgotPasswordStudent);
route.put("/reset-passwordStudent/:studentId/:token", changePassValStudent, resetPasswordStudent);
route.put('/updateStudent/:studentId', updateSchoolStudent);
route.delete('/deleteStudent/:studentId', deleteSchoolStudent);
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