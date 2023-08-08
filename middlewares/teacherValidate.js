const teacherModel = require('../models/teachersModel')

const validateteacher = async (req, res, next)=>{
    const {
        teacherName,
        teacherEmail,
        teacherClass,
        teacherAge,
        password,
        confirmPassword
    } = req.body;

    try {
        const isEmail = await teacherModel.findOne({ teacherEmail });
        if (isEmail) {
            res.status(400).json({
                message: `Teacher with email: ${teacherEmail}, already exists. Try to Log in.`
            })
        } else {
            if (
                !teacherName &&
                !teacherEmail &&
                !teacherClass &&
                !teacherAge &&
                !password &&
                !confirmPassword
            ) {
                return res.status(400).json({message: "All fields are required."});
            } else if (!teacherName) {
                return res.status(400).json({message: "Teacher name is required."});
            } else if (!teacherEmail) {
                return res.status(400).json({message: "Teacher email is required."});
            } else if (!teacherClass) {
                return res.status(400).json({message: "Teacher class is required."});
            } else if (!teacherAge) {
                return res.status(400).json({message: "Teacher's age is required."});
            } else if (!password) {
                return res.status(400).json({message: "Password is required."});
            } else if (!confirmPassword) {
                return res.status(400).json({message: "Confirm password is required."});
            } else if (teacherName.length < 4) {
                return res.status(400).json({message: "Teacher name must have at least 4 characters."});
            } else if (teacherEmail.length < 4) {
                return res.status(400).json({message: "Teacher email must have at least 4 characters."});
            } else if (teacherClass.length < 4) {
                return res.status(400).json({message: "Teacher class must have at least 4 characters."});
            } else if (teacherAge.length < 2) {
                return res.status(400).json({message: "Teacher age have at least 2 characters."});
            } else if (!/^[a-zA-Z0-9\s]+$/.test(teacherName)) {
                return res.status(400).json({message: "Invalid format for Teacher name."});
            } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacherEmail)) {
                return res.status(400).json({message: "Invalid email format."});
            } else if (!/^[a-zA-Z\s\d]{5,}$/.test(teacherClass)) {
                return res.status(400).json({message: "Invalid Teacher class, It must have more than 4 characters with letters and spaces only."});
            } else if (!/^[1-9][0-9]$/.test(teacherAge)) {
                return res.status(400).json({message: "Invalid Teacher age, It will only take in two digits."});
            } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
                return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
            } else if (password !== confirmPassword) {
                return res.status(400).json({message: "Passwords do not match."});
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}




const loginValTeacher = async (req, res, next)=>{
    const {
        teacherEmail,
        password
    } = req.body;
    if (
        !teacherEmail &&
        !password
    ) {
        return res.status(400).json({message: "All fields are required."});
    } else if (!teacherEmail) {
        return res.status(400).json({message: "Email is required."});
    } else if (teacherEmail.length < 4) {
        return res.status(400).json({message: "Teacher email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacherEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else if (!password) {
        return res.status(400).json({message: "Password is required."});
    }  else if (password.length < 4) {
        return res.status(400).json({message: "Password must have at least 4 characters."});
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
    } else {
        const isEmail = await teacherModel.findOne({ teacherEmail });
        if (!isEmail) {
            res.status(400).json({
                message: `Teacher with email: ${teacherEmail}, doesn't exist. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    };
};



const changePassValTeacher = async (req, res, teacherId, next)=>{
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
        const isUser = await teacherModel.findById(teacherId);
        if (!isUser) {
            res.status(400).json({
                message: `You are not a user on this Platform. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    }
}




const forgotPassValTeacher = async (req, res, next)=>{
    const {
        teacherEmail
    } = req.body;
    if (!teacherEmail) {
        return res.status(400).json({message: "Teacher email is required."});
    } else if (teacherEmail.length < 4) {
        return res.status(400).json({message: "Teacher email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacherEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else {
        next()
    }
};







module.exports = {
    validateteacher,
    loginValTeacher,
    changePassValTeacher,
    forgotPassValTeacher
};