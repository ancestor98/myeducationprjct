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
// route.post('/register', upload.single('schoolLogo'), validateUser, register)
// route.post('/register', validateUser, register)
route.post('/register', validateUser, register)
route.put('/verify/:schoolId/:token', verifyEmail)
route.put('/re-verify', verifyEmailVal, resendEmailVerification)
route.post('/login', loginVal, logIn)
route.post('/logout/:schoolId', signOut)
route.put("/changePassword/:schoolId", changePassVal, changePassword);
route.post("/forgot-password", forgotPassVal, forgotPassword);
route.put("/reset-password/:schoolId/:token", changePassVal, resetPassword);
route.put('/updateSchool/:schoolId', validateUpdateUser, updateSchool)
route.delete('/deleteSchool/:schoolId', deleteSchool)
route.post('/teacherLink/:schoolId', teacherEmailVal, teacherLink)
route.get('/readAllSchools', readAllSchools);
route.get('/readOneSchool/:schoolId', readOneSchool);


// Route for Teachers Alone.
// route.post('/newTeacher/:id/:token', upload.single('teacherImage'), newTeacher)
route.post('/newTeacher/:schoolId/:token', validateteacher, newTeacher)
route.post('/loginTeacher', loginValTeacher, teacherLogin)
route.post('/logoutTeacher/:teacherId', signOutTeacher)
route.put("/changePasswordTeacher/:teacherId", changePassValTeacher, changePasswordTeacher);
route.post("/forgot-passwordTeacher", forgotPassValTeacher, forgotPasswordTeacher);
route.put("/reset-passwordTeacher/:teacherId/:token", changePassValTeacher, resetPasswordTeacher);
route.put('/updateTeacher/:teacherId', validateUpdateteacher, updateSchoolTeacher)
route.delete('/deleteTeacher/:teacherId', deleteSchoolTeacher)
route.get('/readAllTeachers', readAllTeachers);
route.get('/readOneTeacher/:teacherId', readOneTeacher);



// Route for Students Alone.
route.post('/newStudent/:teacherId', validateStudent, newStudent)
route.post('/loginStudent', loginValStudent, studentLogin)
route.post('/logoutStudent/:studentId', signOutStudent)
route.put("/changePasswordStudent/:studentId", changePassValStudent, changePasswordStudent);
route.post("/forgot-passwordStudent", forgotPassValStudent, forgotPasswordStudent);
route.put("/reset-passwordStudent/:studentId/:token", changePassValStudent, resetPasswordStudent);
route.put('/updateStudent/:studentId', validateUpdateStudent, updateSchoolStudent);
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