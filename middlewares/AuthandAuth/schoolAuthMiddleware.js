const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');
const teacherModel = require('../../models/teachersModel');
const studentModel = require('../../models/studentsModel');
const { decodeToken, decodeTokenT, decodeTokenS } = require('../../utilities/jwt')




// auth middleware
const userAuth = async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const hasAuthorization = req.headers.authorization;
        const token = hasAuthorization.split(" ")[1];
  
        // const user = await decodeToken(token);
        // req.user = user;
        // // console.log(req.user);
        // if (req.user.isLogin == true) {
        if (hasAuthorization) {
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




// auth middleware for teachers
const userAuthT = async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const hasAuthorization = req.headers.authorization;
        const token = hasAuthorization.split(" ")[1];
  
        // const user = await decodeTokenT(token);
        // req.user = user;
        // // console.log(req.user);
        // if (req.user.isLogin == true) {
        if (hasAuthorization) {
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
      res.status(500).json({ messageccc: error.message });
    }
};



// auth middleware for students
const userAuthS = async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const hasAuthorization = req.headers.authorization;
        const token = hasAuthorization.split(" ")[1];
  
        // const user = await decodeTokenS(token);
        // req.user = user;
        // console.log(req.user);
        // if (req.user.isLogin == true) {
        if (hasAuthorization) {
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
    userAuth,
    userAuthT,
    userAuthS
}