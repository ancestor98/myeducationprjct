const Joi = require('@hapi/joi');


const validateteacher = async (req, res, next)=>{
    const schema = await Joi.object({
        teacherName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).required().messages({
            'string.pattern.base': 'Teacher Name must contain at least 5 characters with letters and spaces only.',
          }),
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
          }),
        teacherClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).required().messages({
            'string.pattern.base': 'Teacher Class must contain at least 5 characters with letters and spaces only.',
          }),
        teacherAge: Joi.string().required().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Teachers Age must take in only Two digits Numbers.',
          }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Teacher Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
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


const loginValTeacher = async (req, res, next)=>{
    const schema = await Joi.object({
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
        }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Teacher Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
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


const changePassValTeacher = async (req, res, next)=>{
    const schema = await Joi.object({
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'School Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
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



const forgotPassValTeacher = async (req, res, next)=>{
    const schema = await Joi.object({
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
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






const validateUpdateteacher = async (req, res, next)=>{
    const schema = await Joi.object({
        teacherName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).messages({
            'string.pattern.base': 'Teacher Name must contain at least 5 characters with letters and spaces only.',
          }),
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'Wrong Email format.',
          }),
        teacherClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).messages({
            'string.pattern.base': 'Teacher Class must contain at least 5 characters with letters and spaces only.',
          }),
        teacherAge: Joi.string().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Teachers Age must take in only Two digits Numbers.',
          }),
        password: Joi.string().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Teacher Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
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
    validateteacher,
    loginValTeacher,
    changePassValTeacher,
    forgotPassValTeacher,
    validateUpdateteacher
};