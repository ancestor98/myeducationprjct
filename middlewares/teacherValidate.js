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

    if (req.method !== "POST") {
        return res.status(400).json({ message: `Invalid request method. Use the "POST" method to Register Teacher information.` });
    }


    try {

        // Check if all fields are empty
        if (!teacherName &&
            !teacherEmail &&
            !teacherClass &&
            !teacherAge &&
            !password &&
            !confirmPassword ) {
            return res.status(400).json({ message: "All fields cannot be empty." });
        }

        // CHECK TEACHER NAME
        if (!teacherName) {
            return res.status(400).json({ message: `Teacher Name of school must be filled.` });
        }
        if (teacherName.length < 4) {
            return res.status(400).json({ message: `Please pass a correct Teacher name.` });
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(teacherName)) {
            return res.status(400).json({ message: `Invalid Teacher name format.` });
        }


        // CHECK EMAIL
        if (!teacherEmail) {
            return res.status(400).json({ message: `Email of Teacher must be filled.` });
        }

        if (teacherEmail.length < 7) {
            return res.status(400).json({ message: `Please pass a correct email.` });
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(teacherEmail)) {
            return res.status(400).json({ message: `Invalid email format.` });
        }
        const isEmail = await teacherModel.findOne({teacherEmail});
        if (isEmail) {
            return res.status(400).json({
                message: `Teacher with this Email: ${teacherEmail} already exist.`
            })
        }

        // CHECK PASSWORD
        if (!password) {
            return res.status(400).json({ message: `Password of Teacher must be filled.` });
        }
        if (password.length < 5) {
            return res.status(400).json({ message: `Please pass a correct password.` });
        }
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
            return res.status(400).json({ message: `Password must have at least 8 characters, including one uppercase, one lowercase, and one digit.` });
        }

        // CHECK CONFIRM-PASSWORD
        if (!confirmPassword) {
            return res.status(400).json({ message: `Confirm password of Teacher must be filled.` });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: `Passwords do not match.` });
        }

        // Teacher Class
        if (teacherClass && !/^[a-zA-Z\s\d]{5,}$/.test(teacherClass)) {
            return res.status(400).json({message: "Invalid Teacher class, It must have more than 4 characters with letters and spaces only."});
        }

        // Teacher Age
        if (teacherAge && !/^[1-9][0-9]$/.test(teacherAge)) {
            return res.status(400).json({message: "Invalid Teacher age, It will only take in two digits."});
        }

        next();
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
};






async function updateTeacherInfoMiddleware (req, res, next) {
    try {
        if (req.method !== "PUT") {
            return res.status(400).json({ message: `Invalid request method. Use the "PUT" method to update teacher's information.` });
        }
        const {
            teacherName,
            teacherEmail,
            teacherClass,
            teacherAge
        } = req.body;

        // Check if all fields are empty
        if (!teacherName &&
            !teacherEmail &&
            !teacherClass &&
            !teacherAge  ) {
            return res.status(400).json({ message: "All fields cannot be empty." });
        }

        // Check if the user exists based on the provided userId
        const { teacherId } = req.params; 
        const existingUser = await teacherModel.findById(teacherId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found, Passed wrong teacherId." });
        }

        // Check if the schoolEmail can't be changed
        if (!teacherEmail) {
            return res.status(400).json({ message: `Email of teacher must be filled in for security reasons.` });
        }
        if (teacherEmail !== existingUser.teacherEmail) {
            return res.status(400).json({ message: `Email of teacher can't be changed, maintain the Original one.` });
        }

        // Check other field validations
        if (teacherName && teacherName.length < 4) {
            return res.status(400).json({ message: "Invalid teacher name format." });
        }
        if (teacherName && !/^[a-zA-Z0-9\s]+$/.test(teacherName)) {
            return res.status(400).json({ message: "Invalid format for teacher name. Teacher name can only contain alphabets with spaces." });
        }

        // Teacher Class
        if (teacherClass && teacherClass.length < 4) {
            return res.status(400).json({ message: "Invalid teacher class format." });
        }
        if (teacherClass && !/^[a-zA-Z\s\d]{5,}$/.test(teacherClass)) {
            return res.status(400).json({ message: "Invalid Teacher class, It must have more than 4 characters with letters and spaces only." });
        }


        // Teacher Age
        if (teacherAge && teacherAge.length < 2) {
            return res.status(400).json({ message: "Invalid teacher age format." });
        }
        if (teacherAge && !/^[1-9][0-9]$/.test(teacherAge)) {
            return res.status(400).json({ message: "Invalid Teacher age, It will only take in two digits." });
        }

        next()
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



const changePassValTeacher = async (req, res, next)=>{
    const {
        password
    } = req.body;
    const { teacherId } = req.params;
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
    forgotPassValTeacher,
    updateTeacherInfoMiddleware
};