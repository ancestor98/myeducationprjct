const validateUser = require('../middlewares/userValidate');
const {
    register,
    verifyEmail,
    resendEmailVerification,
    logIn,
    signOut
} = require('../controllers/userController');
const { newTeacher } = require('../controllers/teachersController')
const upload = require('../utilities/multer');

const express = require('express');
const route = express.Router();

route.post('/register', upload.single('schoolLogo'), validateUser, register)
route.put('/verify/:id/:token', verifyEmail)
route.put('/re-verify', resendEmailVerification)
route.post('/login', logIn)
route.post('/logout/:id', signOut)
route.post('/newTeacher/:id', upload.single('teacherImage'), newTeacher)



module.exports = { route };