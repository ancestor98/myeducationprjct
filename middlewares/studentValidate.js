const Joi = require('@hapi/joi');


const validateStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).required().messages({
            'string.pattern.base': 'Student Name must contain at least 5 characters with letters and spaces only.',
          }),
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
          }),
        studentClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).required().messages({
            'string.pattern.base': 'Student Class must contain at least 5 characters with letters and spaces only.',
          }),
        studentAge: Joi.string().required().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Students Age must take in only Two digits Numbers.',
          }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
          }),
        confirmPassword: Joi.string()
    })
    const { error } = schema.validate(req.body);
    if(error) {
        const validateError = error.details.map((detail)=>detail.message);
        // console.log(error)
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
};



const loginValStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
        }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
        })
    })
    const { error } = schema.validate(req.body);
    if(error) {
        const validateError = error.details.map((detail)=>detail.message);
        // console.log(error)
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
};


const changePassValStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
        })
    })
    const { error } = schema.validate(req.body);
    if(error) {
        const validateError = error.details.map((detail)=>detail.message);
        // console.log(error)
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
};



const forgotPassValStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
        })
    })
    const { error } = schema.validate(req.body);
    if(error) {
        const validateError = error.details.map((detail)=>detail.message);
        // console.log(error)
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
};



const validateUpdateStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).messages({
            'string.pattern.base': 'Student Name must contain at least 5 characters with letters and spaces only.',
          }),
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'Wrong Email format.',
          }),
        studentClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).messages({
            'string.pattern.base': 'Student Class must contain at least 5 characters with letters and spaces only.',
          }),
        studentAge: Joi.string().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Students Age must take in only Two digits Numbers.',
          }),
        password: Joi.string().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
          }),
        confirmPassword: Joi.string()
    })
    const { error } = schema.validate(req.body);
    if(error) {
        const validateError = error.details.map((detail)=>detail.message);
        // console.log(error)
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
};





module.exports = {
    validateStudent,
    loginValStudent,
    changePassValStudent,
    forgotPassValStudent,
    validateUpdateStudent
};