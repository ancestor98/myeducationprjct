const Joi = require('@hapi/joi');


const validateStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).required().messages({
            'string.pattern.base': 'Student Name must contain at least 5 characters with letters and spaces only.',
            "string.base": `Please provide the student's name.`,
            "string.empty": `Please provide the student's name.`,
          }),
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": `Please provide the student's email.`,
            "string.empty": `Please provide the student's email.`,
          }),
        studentClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).required().messages({
            'string.pattern.base': 'Student Class must contain at least 5 characters with letters and spaces only.',
            "string.base": `Please provide the student's class.`,
            "string.empty": `Please provide the student's class.`,
          }),
        studentAge: Joi.string().required().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Students Age must take in only Two digits Numbers.',
            "string.base": `Please provide the student's age.`,
            "string.empty": `Please provide the student's age.`,
          }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Pin Number must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": `Please provide the student's pin number/password.`,
            "string.empty": `Please provide the student's pin Number/password.`,
          }),
        confirmPassword: Joi.string().messages({
            "string.base": `Please confirm the student's pin number/password.`,
            "string.empty": `Please confirm the student's pin number/password.`,
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



const loginValStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your Email.",
            "string.empty": "Please provide your Email.",
        }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a pin number/password.",
            "string.empty": "Please provide a pin number/password.",
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
            "string.base": "Please provide a Password/pin number.",
            "string.empty": "Please provide a Password/pin number.",
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



const validateUpdateStudent = async (req, res, next)=>{
    const schema = await Joi.object({
        studentName: Joi.string().pattern(/^[a-zA-Z\s]{5,}$/).messages({
            'string.pattern.base': 'Student Name must contain at least 5 characters with letters and spaces only.',
            "string.base": "Please provide your Name.",
            "string.empty": "Please provide your Name.",
          }),
        studentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": `Please provide the student's email.`,
            "string.empty": `Please provide the student's email.`,
          }),
        studentClass: Joi.string().pattern(/^[a-zA-Z\s\d]{5,}$/).messages({
            'string.pattern.base': 'Student Class must contain at least 5 characters with letters and spaces only.',
            "string.base": `Please provide the student's class.`,
            "string.empty": `Please provide the student's class.`,
          }),
        studentAge: Joi.string().pattern(/^[1-9][0-9]$/).messages({
            'string.pattern.base': 'Students Age must take in only Two digits Numbers.',
            "string.base": `Please provide the student's age.`,
            "string.empty": `Please provide the student's age.`,
          }),
        password: Joi.string().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'Student Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": `Please provide the student's pin number/password.`,
            "string.empty": `Please provide the student's pin Number/password.`,
          }),
        confirmPassword: Joi.string().messages({
            "string.base": `Please confirm the student's pin number/password.`,
            "string.empty": `Please confirm the student's pin number/password.`,
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
    validateStudent,
    loginValStudent,
    changePassValStudent,
    forgotPassValStudent,
    validateUpdateStudent
};