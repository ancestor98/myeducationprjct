const Joi = require('@hapi/joi');


const validateteacher = async (req, res, next)=>{
    const schema = await Joi.object({
        teacherName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).required().messages({
            'string.pattern.base': 'Teacher Name must contain at least 5 characters with letters and spaces only.',
            "string.base": "Please provide your name.",
            "string.empty": "Please provide your name.",
          }),
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your Email.",
            "string.empty": "Please provide your Email.",
          }),
        teacherClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).required().messages({
            'string.pattern.base': 'Teacher Class must contain at least 5 characters with letters and spaces only.',
            "string.base": "Please provide your Class.",
            "string.empty": "Please provide your Class.",
          }),
        teacherAge: Joi.string().required().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Teachers Age must take in only Two digits Numbers.',
            "string.base": "Please provide your Age.",
            "string.empty": "Please provide your Age.",
          }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Teacher Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
          }),
        confirmPassword: Joi.string().messages({
            "string.base": "Please confirm your Password.",
            "string.empty": "Please confirm your Password.",
        }),
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
            "string.base": "Please provide your Email.",
            "string.empty": "Please provide your Email.",
        }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Teacher Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
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
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
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
            "string.base": "Please provide your Email.",
            "string.empty": "Please provide your Email.",
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
            "string.base": "Please provide your name.",
            "string.empty": "Please provide your name.",
          }),
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your Email.",
            "string.empty": "Please provide your Email.",
          }),
        teacherClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).messages({
            'string.pattern.base': 'Teacher Class must contain at least 5 characters with letters and spaces only.',
            "string.base": "Please provide your Class.",
            "string.empty": "Please provide your Class.",
          }),
        teacherAge: Joi.string().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Teachers Age must take in only Two digits Numbers.',
            "string.base": "Please provide your Age.",
            "string.empty": "Please provide your Age.",
          }),
        password: Joi.string().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Teacher Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
          }),
        confirmPassword: Joi.string().messages({
            "string.base": "Please confirm your Password.",
            "string.empty": "Please confirm your Password.",
        }),
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