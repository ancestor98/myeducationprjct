const userModel = require('../models/userModel');




const validateInputsMiddleware = async (req, res, next) => {
    try {
        const {
            schoolName,
            schoolEmail,
            password,
            confirmPassword
        } = req.body;

        if (req.method !== "POST") {
            return res.status(400).json({ message: `Invalid request method. Use the "POST" method to Register School information.` });
        }


        // Check if all fields are empty
        if (!schoolName &&
            !schoolEmail &&
            !password &&
            !confirmPassword ) {
            return res.status(400).json({ message: "All fields cannot be empty." });
        }

        // CHECK SCHOOL NAME
        if (!schoolName) {
            return res.status(400).json({ message: `School Name of school must be filled.` });
        }
        if (schoolName.length < 8) {
            return res.status(400).json({ message: `Please pass a correct school name.` });
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(schoolName)) {
            return res.status(400).json({ message: `Invalid school name format.` });
        }


        // CHECK EMAIL
        if (!schoolEmail) {
            return res.status(400).json({ message: `Email of school must be filled.` });
        }

        if (schoolEmail.length < 7) {
            return res.status(400).json({ message: `Please pass a correct email.` });
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(schoolEmail)) {
            return res.status(400).json({ message: `Invalid email format.` });
        }
        const isEmail = await userModel.findOne({schoolEmail});
        if (isEmail) {
            return res.status(400).json({
                message: `School with this Email: ${schoolEmail} already exist.`
            })
        }


        // CHECK PASSWORD
        if (!password) {
            return res.status(400).json({ message: `Password of school must be filled.` });
        }
        if (password.length < 5) {
            return res.status(400).json({ message: `Please pass a correct password.` });
        }
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
            return res.status(400).json({ message: `Password must have at least 8 characters, including one uppercase, one lowercase, and one digit.` });
        }


        // CHECK CONFIRM-PASSWORD
        if (!confirmPassword) {
            return res.status(400).json({ message: `Confirm password of school must be filled.` });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: `Passwords do not match.` });
        }

        next();

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}





















async function updateUserInfoMiddleware(req, res, next) {
    try {
        if (req.method !== "PUT") {
            return res.status(400).json({ message: `Invalid request method. Use the "PUT" method to update school information.` });
        }

        const {
            schoolName,
            schoolEmail,
            schoolAddress,
            state,
            country,
            regNo,
            website
        } = req.body;

        // Check if all fields are empty
        if (!schoolName &&
            !schoolAddress &&
            !state &&
            !country &&
            !regNo &&
            !website) {
            return res.status(400).json({ message: "All fields cannot be empty." });
        }

        // Check if the user exists based on the provided userId
        const { schoolId } = req.params; 
        const existingUser = await userModel.findById(schoolId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found, Passed wrong SchoolId." });
        }


        // Check if the schoolEmail can't be changed
        if (!schoolEmail) {
            return res.status(400).json({ message: `Email of school must be filled in for security reasons.` });
        }
        if (schoolEmail !== existingUser.schoolEmail) {
            return res.status(400).json({ message: `Email of school can't be changed, maintain the Original one.` });
        }

        // Check if the provided registration number is unique if it's provided
        if (regNo) {
            const isRegNoTaken = await userModel.findOne({ regNo, _id: { $ne: req.params.userId } });
            if (isRegNoTaken) {
                return res.status(400).json({ message: "Registration number is already associated with another user. NOTE: It is Unique." });
            }
        }

        // Check other field validations
        if (schoolName && schoolName.length < 4) {
            return res.status(400).json({ message: "Invalid school name format." });
        }
        if (schoolName && !/^[a-zA-Z0-9\s]+$/.test(schoolName)) {
            return res.status(400).json({ message: "Invalid format for school name. School name can only contain alphabets with spaces." });
        }

        // School Address
        if (schoolAddress && schoolAddress.length < 4) {
            return res.status(400).json({ message: "Invalid school address format." });
        }  
        if (schoolAddress && !/^[a-zA-Z0-9\s]+$/.test(schoolAddress)) {
            return res.status(400).json({ message: "Invalid school address format. School address can only contain alphabets and numbers, no other character." });
        }  
        
        // State
        if (state && state.length < 4) {
            return res.status(400).json({message: "State must have at least 4 characters."});
        } 
        if (state && !/^(?:a(b(ia|uja|kiliki|koko)|dam(a|wa)|kwa(iba|ra)|d(ama|ambe|o)to|i(amo|gbo)|ku(nfu|m)|na(mbe|ssarawa|ss|turawa)|oyo|gun|z(u|aria)))|b(a(uchi|uchi)|e(nci|nu)|ornu|yelsa)|d(elta|utse)|e(do|kiti|kiti-)|f(ederal capital territory|ide)|g(ombe|s)|imbi|j(i(gawa|gawa)|osa)|k(aduna|aduna)|l(a(go|gos)|agos)|m(ak(urdi|urdi)|inna)|n(assarawa|iger|suka)|o(ndo|sun)|r(ivers|ivers)|t(araba|araba)|y(obe|ola))$/.test(state)) {
            return res.status(400).json({message: "State must be a Nigerian State."});
        } 

        // Country
        if (country && country.length < 4) {
            return res.status(400).json({message: "Country must have at least 4 characters."});
        }
        if (country && !/^(nigeria)$/i.test(country)) {
            return res.status(400).json({message: "Country must be Nigeria."});
        }

        // RegNo
        if (regNo && regNo.length < 4) {
            return res.status(400).json({message: "Registration number must have at least 4 characters."});
        } 
        if (regNo && !/^(PRM|SEC|TER|PVT|GOV|SPE)-[A-Z]{4}-\d{4}$/.test(regNo)) {
            return res.status(400).json({message: `Invalid registration number format. Please use the following format: --PRM-ABCD-1234--. 
            - PRM, SEC, TER, PVT, GOV, or SPE as the prefix.
            - ABCD should be four uppercase letters.
            - 1234 should be a four-digit number.`});
        }
        // Website
        if (website && website.length < 4 ) {
            return res.status(400).json({ message: "Website URL must have at least 4 characters." });
        }    
        if (website && !/^www\..+\..+$/.test(website)) {
            return res.status(400).json({message: "Invalid URL format for website."});
        }                      
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error.'
        });
    }
}




















const verifyEmailVal = async (req, res, next)=>{
    const {
        schoolEmail
    } = req.body;
    if (!schoolEmail) {
        return res.status(400).json({message: "School email is required."});
    } else if (schoolEmail.length < 5) {
        return res.status(400).json({message: "School email must have at least 5 characters."});
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
    teacherEmailVal,
    updateUserInfoMiddleware
}