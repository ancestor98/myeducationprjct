const jwt = require('jsonwebtoken');
const teacherModel = require('../../models/teachersModel');
const { decodeTokenT } = require('../../utilities/jwt');



// auth Middleware
const userAuthTeacher = (req, res, next)=>{
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
            req.teacherEmail = decodedToken.teacherEmail;
            req.teacherName = decodedToken.teacherName;
            next()
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
};


const authenticator = async (req, res,next)=>{
    const { teacherId } = req.params;
    const newUser = await teacherModel.findById(teacherId);
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


const loginAuthTeacher = (req, res, next)=>{
    authenticator(req, res, async ()=>{
        const { teacherId } = req.params;
        const existingUser = await teacherModel.findById(teacherId);
        if (existingUser.islogin == false) {
            res.status(403).json({
                message: 'You need to be log in'
            })
        } else {
            next()
        }
    })
};


const isAdminAuthorizedTeacher = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const { teacherId } = req.params;
        const existingUser = await teacherModel.findById(teacherId);
        if(existingUser.isAdmin == false){
            res.status(403).json({
                message: 'You are not an Admin'
            })
        } else {
            next()
        }
    })
};

const isSuperAdminAuthorizedTeacher = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const { teacherId } = req.params;
        const existingUser = await teacherModel.findById(teacherId);
        if(existingUser.isSuperAdmin == false){
            res.status(403).json({
                message: 'You are not a Super Admin'
            })
        } else {
            next()
        }
    })
};
















// auth middleware
const userAuthT = async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const hasAuthorization = req.headers.authorization;
        const token = hasAuthorization.split(" ")[1];
  
        const user = await decodeTokenT(token);
        req.user = user;
        // console.log(req.user);
        if (req.user.islogin == true) {
          next();
        } else {
          res.status(401).json({
            message: "please login",
          });
        }
      } else {
        res.status(404).json({
          message: "No authorization found, please login",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };











module.exports = {
    userAuthTeacher,
    isAdminAuthorizedTeacher,
    isSuperAdminAuthorizedTeacher,
    loginAuthTeacher,
    userAuthT
}