const Joi = require('@hapi/joi');


const validateUser = async (req, res, next)=>{
    const schema = await Joi.object({
        schoolName: Joi.string().pattern(/^[a-zA-Z\s]+$/).required(),
        schoolEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
        schoolAddress: Joi.string().pattern(/^[A-Za-z0-9\s.,'"-]+$/).required(),
        state: Joi.string(),
        country: Joi.string(),
        password: Joi.string(),
        confirmPassword: Joi.string(),
        // website: Joi.string()
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

module.exports = validateUser;