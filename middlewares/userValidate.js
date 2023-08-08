const userModel = require('../models/userModel');

async function validateInputsMiddleware(req, res, next) {
    const {
        schoolName,
        schoolEmail,
        schoolAddress,
        state,
        country,
        regNo,
        password,
        confirmPassword,
        website
    } = req.body;

    try {
        const isEmail = await userModel.findOne({ schoolEmail });
        if (isEmail) {
            res.status(400).json({
                message: `School with email: ${schoolEmail}, already exists. Try to check your email to verify your account on ProgressPal or Log in.`
            })
        } else {
            const isRegNo = await userModel.findOne({ regNo })
            if (isRegNo) {
                res.status(400).json({
                    message: 'School Registration Number already Exists. Reach out to the Registration body of the Federal Government.'
                })
            } else {
                if (
                    !schoolName &&
                    !schoolEmail &&
                    !schoolAddress &&
                    !state &&
                    !country &&
                    !regNo &&
                    !password &&
                    !confirmPassword &&
                    !website
                ) {
                    return res.status(400).json({message: "All fields are required."});
                } else if (!schoolName) {
                    return res.status(400).json({message: "School name is required."});
                } else if (!schoolEmail) {
                    return res.status(400).json({message: "School email is required."});
                } else if (!schoolAddress) {
                    return res.status(400).json({message: "School address is required."});
                } else if (!state) {
                    return res.status(400).json({message: "State is required."});
                } else if (!country) {
                    return res.status(400).json({message: "Country is required."});
                } else if (!regNo) {
                    return res.status(400).json({message: "Registration number is required."});
                } else if (!password) {
                    return res.status(400).json({message: "Password is required."});
                } else if (!confirmPassword) {
                    return res.status(400).json({message: "Confirm password is required."});
                } else if (!website) {
                    return res.status(400).json({message: "Website URL is required."});
                } else if (schoolName.length < 4) {
                    return res.status(400).json({message: "School name must have at least 4 characters."});
                } else if (schoolEmail.length < 4) {
                    return res.status(400).json({message: "School email must have at least 4 characters."});
                } else if (schoolAddress.length < 4) {
                    return res.status(400).json({message: "School address must have at least 4 characters."});
                } else if (state.length < 4) {
                    return res.status(400).json({message: "State must have at least 4 characters."});
                } else if (country.length < 4) {
                    return res.status(400).json({message: "Country must have at least 4 characters."});
                } else if (regNo.length < 4) {
                    return res.status(400).json({message: "Registration number must have at least 4 characters."});
                } else if (password.length < 4) {
                    return res.status(400).json({message: "Password must have at least 4 characters."});
                } else if (confirmPassword.length < 4) {
                    return res.status(400).json({message: "Confirm password must have at least 4 characters."});
                } else if (!/^[a-zA-Z0-9\s]+$/.test(schoolName)) {
                    return res.status(400).json({message: "Invalid format for school name."});
                } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(schoolEmail)) {
                    return res.status(400).json({message: "Invalid email format."});
                } else if (!/^[a-zA-Z0-9\s]+$/.test(schoolAddress)) {
                    return res.status(400).json({message: "Invalid format for school address."});
                } else if (!/^[a-zA-Z\s]+$/.test(state)) {
                    return res.status(400).json({message: "Invalid format for state."});
                } else if (!/^(nigeria)$/i.test(country)) {
                    return res.status(400).json({message: "Country must be Nigeria."});
                } else if (!/^(PRM|SEC|TER|PVT|GOV|SPE)-[A-Z]{4}-\d{4}$/.test(regNo)) {
                    return res.status(400).json({message: `Invalid registration number format. Please use the following format: --PRM-ABCD-1234--. 
                    - PRM, SEC, TER, PVT, GOV, or SPE as the prefix.
                    - ABCD should be four uppercase letters.
                    - 1234 should be a four-digit number.`});
                } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
                    return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
                } else if (password !== confirmPassword) {
                    return res.status(400).json({message: "Passwords do not match."});
                } else if (!/^www\..+\..+$/.test(website)) {
                    return res.status(400).json({message: "Invalid URL format for website."});
                } else {
                    next();
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}



const verifyEmailVal = async (req, res, next)=>{
    const {
        schoolEmail
    } = req.body;
    if (!schoolEmail) {
        return res.status(400).json({message: "School email is required."});
    } else if (schoolEmail.length < 4) {
        return res.status(400).json({message: "School email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(schoolEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else {
        next();
    }
}



const loginVal = async (req, res, next)=>{
    const {
        schoolEmail,
        password
    } = req.body;
    if (
        !schoolEmail &&
        !password
    ) {
        return res.status(400).json({message: "All fields are required."});
    } else if (!schoolEmail) {
        return res.status(400).json({message: "Email is required."});
    } else if (schoolEmail.length < 4) {
        return res.status(400).json({message: "School email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(schoolEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else if (!password) {
        return res.status(400).json({message: "Password is required."});
    }  else if (password.length < 4) {
        return res.status(400).json({message: "Password must have at least 4 characters."});
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
    } else {
        const isEmail = await userModel.findOne({ schoolEmail });
        if (!isEmail) {
            res.status(400).json({
                message: `School with email: ${schoolEmail}, doesn't exist. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    };
};


const changePassVal = async (req, res, schoolId, next)=>{
    const {
        password
    } = req.body;
    if (!password) {
        return res.status(400).json({message: "Password is required."});
    } else if (password.length < 4) {
        return res.status(400).json({message: "Password must have at least 4 characters."});
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
    } else {
        const isUser = await userModel.findById(schoolId);
        if (!isUser) {
            res.status(400).json({
                message: `You are not a user on this Platform. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    }
}



const forgotPassVal = async (req, res, next)=>{
    const {
        schoolEmail
    } = req.body;
    if (!schoolEmail) {
        return res.status(400).json({message: "School email is required."});
    } else if (schoolEmail.length < 4) {
        return res.status(400).json({message: "School email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(schoolEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else {
        next()
    }
};



const teacherEmailVal = async (req, res, next)=>{
    const {
        teacherEmail
    } = req.body;
    if (!teacherEmail) {
        return res.status(400).json({message: "Teacher's email is required."});
    } else if (teacherEmail.length < 4) {
        return res.status(400).json({message: "Teacher's email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacherEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else {
        next()
    }
};







module.exports = {
    validateInputsMiddleware,
    verifyEmailVal,
    loginVal,
    changePassVal,
    forgotPassVal,
    teacherEmailVal
}