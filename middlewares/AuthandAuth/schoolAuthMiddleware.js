const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');
const { decodeToken } = require('../../utilities/jwt')


// auth Middleware
const userAuthSchool = (req, res, next)=>{
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
            req.schoolEmail = decodedToken.schoolEmail;
            req.schoolName = decodedToken.schoolName;
            next()
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
};


const authenticator = async (req, res,next)=>{
    const { schoolId } = req.params;
    const newUser = await userModel.findById(schoolId);
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


const loginAuthSchool = (req, res, next)=>{
    authenticator(req, res, async ()=>{
        const { schoolId } = req.params;
        const existingUser = await userModel.findById(schoolId);
        if (existingUser.islogin == false) {
            res.status(403).json({
                message: 'You need to be log in'
            })
        } else {
            next()
        }
    })
};


const isAdminAuthorizedSchool = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const { schoolId } = req.params;
        const existingUser = await userModel.findById(schoolId);
        if(existingUser.isAdmin == false){
            res.status(403).json({
                message: 'You are not an Admin'
            })
        } else {
            next()
        }
    })
};

const isSuperAdminAuthorizedSchool = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const { schoolId } = req.params;
        const existingUser = await userModel.findById(schoolId);
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
const userAuth = async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const hasAuthorization = req.headers.authorization;
        const token = hasAuthorization.split(" ")[1];
  
        const user = await decodeToken(token);
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
    userAuthSchool,
    isAdminAuthorizedSchool,
    isSuperAdminAuthorizedSchool,
    loginAuthSchool,
    userAuth
}