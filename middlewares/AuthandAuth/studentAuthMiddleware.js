const jwt = require('jsonwebtoken');
const studentModel = require('../../models/studentsModel');


// auth Middleware
const userAuthStudent = (req, res, next)=>{
    const hasAuthorization = req.headers.authorization;
    if(!hasAuthorization) {
        res.status(403).json({
            message: 'No Authorization Found, Please Login in.'
        });
    } else {
        const token = hasAuthorization.split(' ')[1];
        try {
            // console.log(req.headers)
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decodedToken)
            req.user = JSON.stringify(decodedToken);
            req.userId = decodedToken.userId;
            req.studentEmail = decodedToken.studentEmail;
            req.studentName = decodedToken.studentName;
            next()
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
};


const authenticator = async (req, res,next)=>{
    const { studentId } = req.params;
    const newUser = await studentModel.findById(studentId);
    const token = newUser.token;
    await jwt.verify(token, process.env.JWT_SECRET, (err, payLoad)=>{
        if(err){
            return res.status(403).json({
                message: 'token is not valid'
            })
        } else {
            req.newUser = payLoad;
            next();
        }
    })
}


const loginAuthStudent = (req, res, next)=>{
    authenticator(req, res, async ()=>{
        const { studentId } = req.params;
        const existingUser = await studentModel.findById(studentId);
        if (existingUser.islogin == false) {
            res.status(403).json({
                message: 'You need to be log in'
            })
        } else {
            next()
        }
    })
};


const isAdminAuthorizedStudent = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const { studentId } = req.params;
        const existingUser = await studentModel.findById(studentId);
        if(existingUser.isAdmin == false){
            res.status(403).json({
                message: 'You are not an Admin'
            })
        } else {
            next()
        }
    })
};

const isSuperAdminAuthorizedStudent = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const { studentId } = req.params;
        const existingUser = await studentModel.findById(studentId);
        if(existingUser.isSuperAdmin == false){
            res.status(403).json({
                message: 'You are not a Super Admin'
            })
        } else {
            next()
        }
    })
};






module.exports = {
    userAuthStudent,
    isAdminAuthorizedStudent,
    isSuperAdminAuthorizedStudent,
    loginAuthStudent
}