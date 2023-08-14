const studentModel = require('../models/studentsModel');


const validateStudent = async (req, res, next)=>{
    const {
        studentName,
        studentEmail,
        studentClass,
        studentAge,
        password
    } = req.body;
    if (req.method !== "POST") {
        return res.status(400).json({ message: `Invalid request method. Use the "POST" method to Register Student information.` });
    }
    try {
        // Check if all fields are empty
        if (!studentName &&
            !studentEmail &&
            !studentClass &&
            !studentAge &&
            !password ) {
            return res.status(400).json({ message: "All fields cannot be empty." });
        }

        // CHECK STUDENT NAME
        if (!studentName) {
            return res.status(400).json({ message: `Student Name of school must be filled.` });
        }
        if (studentName.length < 4) {
            return res.status(400).json({ message: `Please pass a correct student name.` });
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(studentName)) {
            return res.status(400).json({ message: `Invalid student name format.` });
        }


        // CHECK EMAIL
        if (!studentEmail) {
            return res.status(400).json({ message: `Email of Student must be filled.` });
        }

        if (studentEmail.length < 7) {
            return res.status(400).json({ message: `Please pass a correct email.` });
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(studentEmail)) {
            return res.status(400).json({ message: `Invalid email format.` });
        }
        const isEmail = await studentModel.findOne({studentEmail});
        if (isEmail) {
            return res.status(400).json({
                message: `Student with this Email: ${studentEmail} already exist.`
            })
        }


        // CHECK PASSWORD
        if (!password) {
            return res.status(400).json({ message: `Password of Teacher must be filled.` });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: `Student's Pin Number must be 4 digits.` });
        }
        if (password.length > 4) {
            return res.status(400).json({ message: `Student's Pin Number must be 4 digits.` });
        }
        if (!/^\d{4}$/.test(password)) {
            return res.status(400).json({ message: `Student's Pin Number must be four(4) digits.` });
        }
        // if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        //     return res.status(400).json({ message: `Password must have at least 8 characters, including one uppercase, one lowercase, and one digit.` });
        // }



        // Student Class
        if (studentClass && !/^[a-zA-Z\s\d]{5,}$/.test(studentClass)) {
            return res.status(400).json({message: "Invalid Student class, It must have more than 4 characters with letters and spaces only."});
        }

        // Student Age
        if (studentAge && !/^[1-9][0-9]$/.test(studentAge)) {
            return res.status(400).json({message: "Invalid Student age, It will only take in two digits."});
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
};





async function updateStudentInfoMiddleware (req, res, next) {
    const {
        studentName,
        studentEmail,
        studentClass,
        studentAge
    } = req.body;
    try {
        if (req.method !== "PUT") {
            return res.status(400).json({ message: `Invalid request method. Use the "PUT" method to update student's information.` });
        }

        // Check if the user exists based on the provided userId
        const { studentId } = req.params; 
        const existingUser = await studentModel.findById(studentId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found, Passed wrong studentId." });
        }

        // Check if all fields are empty
        if (!studentName &&
            !studentEmail &&
            !studentClass &&
            !studentAge ) {
            return res.status(400).json({ message: "All fields cannot be empty." });
        }

        // Check if the studentEmail can't be changed
        if (!studentEmail) {
            return res.status(400).json({ message: `Email of student must be filled in for security reasons.` });
        }
        if (studentEmail !== existingUser.studentEmail) {
            return res.status(400).json({ message: `Email of student can't be changed, maintain the Original one.` });
        }

        // Check other field validations
        if (studentName && studentName.length < 4) {
            return res.status(400).json({ message: "Invalid student name format." });
        }
        if (studentName && !/^[a-zA-Z0-9\s]+$/.test(studentName)) {
            return res.status(400).json({ message: "Invalid format for student name. Student name can only contain alphabets with spaces." });
        }


        // Student Class
        if (studentClass && studentClass.length < 4) {
            return res.status(400).json({ message: "Invalid student class format." });
        }
        if (studentClass && !/^[a-zA-Z\s\d]{5,}$/.test(studentClass)) {
            return res.status(400).json({ message: "Invalid student class, It must have more than 4 characters with letters and spaces only." });
        }


        // Student Age
        if (studentAge && studentAge.length < 2) {
            return res.status(400).json({ message: "Invalid student age format." });
        }
        if (studentAge && !/^[1-9][0-9]$/.test(studentAge)) {
            return res.status(400).json({ message: "Invalid Student age, It will only take in two digits." });
        }

        next()
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}



























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
    } else if (!/^\d{4}$/.test(password)) {
        return res.status(400).json({message: "Password must four(4) digits."});
    } else {
        const isEmail = await studentModel.findOne({ studentEmail });
        if (!isEmail) {
            res.status(400).json({
                message: `Student with email: ${studentEmail}, doesn't exist. Do well to register with us. Try Again later.`
            })
        } else {
            next();
        };
    };
};



const changePassValStudent = async (req, res, next)=>{
    const {
        password
    } = req.body;
    const { studentId } = req.params;
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
    updateStudentInfoMiddleware
};