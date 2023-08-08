const studentModel = require('../models/studentsModel');

const validateStudent = async (req, res, next)=>{
    const {
        studentName,
        studentEmail,
        studentClass,
        studentAge,
        password
    } = req.body;
    try {
        const isEmail = await studentModel.findOne({ studentEmail });
        if (isEmail) {
            res.status(400).json({
                message: `Student with email: ${studentEmail}, already exists.`
            })
        } else {
            if (
                !studentName &&
                !studentEmail &&
                !studentClass &&
                !studentAge &&
                !password 
            ) { 
                return res.status(400).json({message: "All fields are required."});
            } else if (!studentName) {
                return res.status(400).json({message: "Student name is required."});
            } else if (!studentEmail) {
                return res.status(400).json({message: "Student email is required."});
            } else if (!studentClass) {
                return res.status(400).json({message: "Student class is required."});
            } else if (!studentAge) {
                return res.status(400).json({message: "Student's age is required."});
            } else if (!password) {
                return res.status(400).json({message: "Password is required."});
            } else if (studentName.length < 4) {
                return res.status(400).json({message: "Student name must have at least 4 characters."});
            } else if (studentEmail.length < 4) {
                return res.status(400).json({message: "Student email must have at least 4 characters."});
            } else if (studentClass.length < 4) {
                return res.status(400).json({message: "Student class must have at least 4 characters."});
            } else if (studentAge.length < 2) {
                return res.status(400).json({message: "Student age have at least 2 characters."});
            } else if (!/^[a-zA-Z0-9\s]+$/.test(studentName)) {
                return res.status(400).json({message: "Invalid format for Student name."});
            } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(studentEmail)) {
                return res.status(400).json({message: "Invalid email format."});
            } else if (!/^[a-zA-Z\s\d]{5,}$/.test(studentClass)) {
                return res.status(400).json({message: "Invalid Student class, It must have more than 4 characters with letters and spaces only."});
            } else if (!/^[1-9][0-9]$/.test(studentAge)) {
                return res.status(400).json({message: "Invalid Student age, It will only take in two digits."});
            } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
                return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
};


const loginValStudent = async (req, res, next)=>{
    const {
        studentEmail,
        password
    } = req.body;
    if (
        !studentEmail &&
        !password
    ) {
        return res.status(400).json({message: "All fields are required."});
    } else if (!studentEmail) {
        return res.status(400).json({message: "Email is required."});
    } else if (studentEmail.length < 4) {
        return res.status(400).json({message: "Student email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(studentEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else if (!password) {
        return res.status(400).json({message: "Password is required."});
    }  else if (password.length < 4) {
        return res.status(400).json({message: "Password must have at least 4 characters."});
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        return res.status(400).json({message: "Password must have at least 8 characters, including one uppercase, one lowercase, and one digit."});
    } else {
        const isEmail = await teacherModel.findOne({ studentEmail });
        if (!isEmail) {
            res.status(400).json({
                message: `Student with email: ${studentEmail}, doesn't exist. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    };
};



const changePassValStudent = async (req, res, studentId, next)=>{
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
        const isUser = await studentModel.findById(studentId);
        if (!isUser) {
            res.status(400).json({
                message: `You are not a user on this Platform. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    }
}


const forgotPassValStudent = async (req, res, next)=>{
    const {
        studentEmail
    } = req.body;
    if (!studentEmail) {
        return res.status(400).json({message: "Student email is required."});
    } else if (studentEmail.length < 4) {
        return res.status(400).json({message: "Student email must have at least 4 characters."});
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(studentEmail)) {
        return res.status(400).json({message: "Invalid email format."});
    } else {
        next()
    }
};



module.exports = {
    validateStudent,
    loginValStudent,
    changePassValStudent,
};