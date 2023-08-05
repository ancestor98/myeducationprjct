const Joi = require('@hapi/joi');


const validateUser = async (req, res, next)=>{
    const schema = await Joi.object({
        schoolName: Joi.string().pattern(/^[a-zA-Z\s]{11,}$/).required().messages({
            'string.pattern.base': 'School Name must contain at least 11 characters with letters only and spaces',
            "string.base": "Please provide your School name.",
            "string.empty": "Please provide your School name.",
          }),
        schoolEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your School Email.",
            "string.empty": "Please provide your School Email.",
          }),
        schoolAddress: Joi.string().pattern(/^[A-Za-z0-9\s.,'"\-]{9,}$/).required().messages({
            'string.pattern.base': 'School Address should contain  Capital or Small letters, or Number and spaces',
            "string.base": "Please provide your School Address.",
            "string.empty": "Please provide your School Address.",
          }),
        state: Joi.string().required().pattern(/^(abia|adamawa|akwa\s*ibom|anambra|bauchi|bayelsa|benue|borno|cross\s*river|delta|ebonyi|edo|ekiti|enugu|gombe|imo|jigawa|kaduna|kano|katsina|kebbi|kogi|kwara|lagos|nasarawa|niger|ogun|ondo|osun|oyo|plateau|rivers|sokoto|taraba|yobe|zamfara)$/i).messages({
            'string.pattern.base': 'School State must contain one of the 36 states of Nigeria.',
            "string.base": "Please provide your School State.",
            "string.empty": "Please provide your School State.",
          }),
        country: Joi.string().required().pattern(/nigeria/i).messages({
            'string.pattern.base': 'School Country must Nigeria.',
            "string.base": "Please provide your School Country.",
            "string.empty": "Please provide your School Country.",
          }),
        password: Joi.string().required().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'School Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
          }),
        confirmPassword: Joi.string().messages({
            "string.base": "Please confirm your Password.",
            "string.empty": "Please confirm your Password.",
        }),
        website: Joi.string().pattern(/^www\..+\..+$/).messages({
            'string.pattern.base': 'Wrong website format',
            "string.base": "Please provide your School Website.",
            "string.empty": "Please provide your School Website.",
          }),
        regNo: Joi.string().pattern(/^[0-9]{5}[A-Z]{2}$/).required().messages({
            'string.pattern.base': 'Invalid Registration Number, Please Enter the correct Registration Number gotten from your local Government School Registration',
            "string.base": "Please provide your School Registration Number.",
            "string.empty": "Please provide your School Registration Number",
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


const verifyEmailVal = async (req, res, next)=>{
    const schema = await Joi.object({
        schoolEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your School Email.",
            "string.empty": "Please provide your School Email.",
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


const loginVal = async (req, res, next)=>{
    const schema = await Joi.object({
        schoolEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your School Email.",
            "string.empty": "Please provide your School Email.",
        }),
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


const changePassVal = async (req, res, next)=>{
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



const forgotPassVal = async (req, res, next)=>{
    const schema = await Joi.object({
        schoolEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your School Email.",
            "string.empty": "Please provide your School Email.",
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



const teacherEmailVal = async (req, res, next)=>{
    const schema = await Joi.object({
        teacherEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Wrong Email format.',
            'string.pattern.base': 'Wrong Email format.',
            "string.base": `Please provide the Teacher's Email.`,
            "string.empty": `Please provide the Teacher's Email.`,
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






const validateUpdateUser = async (req, res, next)=>{
    const schema = await Joi.object({
        schoolName: Joi.string().pattern(/^[a-zA-Z\s]{11,}$/).messages({
            'string.pattern.base': 'School Name must contain at least 11 characters with letters only and spaces',
            "string.base": "Please provide your School name.",
            "string.empty": "Please provide your School name.",
          }),
        schoolEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'Wrong Email format.',
            "string.base": "Please provide your School Email.",
            "string.empty": "Please provide your School Email.",
          }),
        schoolAddress: Joi.string().pattern(/^[A-Za-z0-9\s.,'"\-]{9,}$/).messages({
            'string.pattern.base': 'School Address should contain  Capital or Small letters, or Number and spaces',
            "string.base": "Please provide your School Address.",
            "string.empty": "Please provide your School Address.",
          }),
        state: Joi.string().pattern(/^(abia|adamawa|akwa\s*ibom|anambra|bauchi|bayelsa|benue|borno|cross\s*river|delta|ebonyi|edo|ekiti|enugu|gombe|imo|jigawa|kaduna|kano|katsina|kebbi|kogi|kwara|lagos|nasarawa|niger|ogun|ondo|osun|oyo|plateau|rivers|sokoto|taraba|yobe|zamfara)$/i).messages({
            'string.pattern.base': 'School State must contain one of the 36 states of Nigeria.',
            "string.base": "Please provide your School State.",
            "string.empty": "Please provide your School State.",
          }),
        country: Joi.string().pattern(/nigeria/i).messages({
            'string.pattern.base': 'School Country must Nigeria.',
            "string.base": "Please provide your School Country.",
            "string.empty": "Please provide your School Country.",
          }),
        password: Joi.string().pattern(/^[A-Za-z0-9]{6}$/).messages({
            'string.pattern.base': 'School Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
          }),
        confirmPassword: Joi.string().messages({
            "string.base": "Please confirm your Password.",
            "string.empty": "Please confirm your Password.",
        }),
        website: Joi.string().pattern(/^www\..+\..+$/).messages({
            'string.pattern.base': 'Wrong website format',
            "string.base": "Please provide your School Website.",
            "string.empty": "Please provide your School Website.",
          }),
        regNo: Joi.string().pattern(/^[0-9]{5}[A-Z]{2}$/).messages({
            'string.pattern.base': 'Invalid Registration Number, Please Enter the correct Registration Number gotten from your local Government School Registration',
            "string.base": "Please provide your School Registration Number.",
            "string.empty": "Please provide your School Registration Number",
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
    validateUser,
    verifyEmailVal,
    loginVal,
    changePassVal,
    forgotPassVal,
    teacherEmailVal,
    validateUpdateUser
};