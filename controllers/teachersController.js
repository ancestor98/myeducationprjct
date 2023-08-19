const userModel = require('../models/userModel');
const teacherModel = require('../models/teachersModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const cloudinary = require('../utilities/cloudinary');
const { genToken, decodeToken, decodeTokenT } = require('../utilities/jwt');
const emailSender = require('../middlewares/email');
const { genEmailReg } = require('../utilities/teacherEmail/register')
const { forgetPassEmail } = require('../utilities/teacherEmail/forgetpassword')
const { genTokenLoginT, genTokensignUpT } = require('../middlewares/AuthandAuth/login')













const newTeacher = async (req, res) => {
    try {
        const { token } = req.params;

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({
                message: 'This link is Expired. Please, Inform your School Administrator to send you another registration Link.'
            });
        }

        const school = await decodeToken(token);

        // console.log(school)


        const {
            teacherName,
            teacherClass,
            teacherAge,
            teacherEmail,
            password,
            confirmPassword
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);
        const hashPassword = await bcrypt.hash(password, salt);

        const data = {
            teacherName: teacherName.toUpperCase(),
            teacherClass,
            teacherAge,
            teacherEmail: teacherEmail.toLowerCase(),
            password: hashPassword,
            confirmPassword: hashConfirmPassword
        };

        if (req.files) {
            const teacherImage = req.files.teacherImage.tempFilePath;
            const uploadImage = await cloudinary.uploader.upload(teacherImage);
            data.teacherImage = uploadImage.secure_url;
        }

        const teacher = new teacherModel(data);
        const tokens = await genToken(teacher, '1d');
        teacher.link = school._id;
        const savedTeacher = await teacher.save();

        school.teachers.push(teacher._id);
        await school.save();

        const subject = 'ProgressPal - welcome!';
        const link = 'https://progresspal-8rxj.onrender.com';
        const html = await genEmailReg(link, savedTeacher);

        emailSender({
            email: teacherEmail,
            subject,
            html
        });

        res.status(200).json({
            message: 'Teacher saved successfully',
            teacher: savedTeacher,
            tokens
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



















// Login
const teacherLogin = async (req, res)=>{
    try {
        const { teacherEmail, password } = req.body;
        const user = await teacherModel.findOne({teacherEmail});
        if (!user) {
            res.status(404).json({
                message: `Teacher with Email: ${teacherEmail} not found.`
            });
        } else {
            const isPassword = await bcrypt.compare(password, user.confirmPassword);
            const islogin = await teacherModel.findByIdAndUpdate(user._id, {islogin: true});
            if(!isPassword) {
                res.status(400).json({
                    message: 'Incorrect Password'
                })
            } else {
                const token = await genToken(user._id, '1d');
                // const token = await genTokenLoginT(user)
                res.status(200).json({
                    message: 'Log in Successful',
                    data: islogin,
                    token: token
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


// Change Password
const changePasswordTeacher = async (req, res) => {
    try {
        const { password } = req.body;
        const { teacherId } = req.params;
        const userPassword = await teacherModel.findById(teacherId);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newPassword = await teacherModel.findByIdAndUpdate(userPassword, {password: hash}, {new: true});
        const newConfirmPassword = await teacherModel.findByIdAndUpdate(userPassword, {confirmPassword: hash}, {new: true});
        if (!newPassword) {
            res.status(400).json({
                message: 'Failed to Change Password'
            })
        } else {
            res.status(200).json({
                message: 'Password Changed Successfully',
                data: userPassword
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// Forgot Password
const forgotPasswordTeacher = async (req, res)=>{
    try {
        const { teacherEmail } = req.body;
        const isEmail = await teacherModel.findOne({ teacherEmail });
        if (!isEmail) {
            res.status(404).json({
                message: 'Teacher Email not found'
            })
        } else {
            const token = await genToken(isEmail._id, '1d')
            const subject = 'ProgressPal - Link for Reset password'
            // const link = `${req.protocol}://${req.get('host')}/progressPal/reset-passwordTeacher/${isEmail._id}/${token}`
            const link = `${req.protocol}://${req.get('host')}/progressPal/reset-passwordTeacher/${token}`
            // const message = `Forgot your Password? it's okay, kindly use this link ${link} to re-set your account password. Please note that this link will expire after 5(five) Minutes.`
            const html = await forgetPassEmail(link)
            emailSender({
                email: teacherEmail,
                subject,
                html
            });
            res.status(200).json({
                message: 'Email sent successfully, please check your Email for the link to reset your Password'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


// Reset Password
const resetPasswordTeacher = async (req, res)=>{
    try {
        const { token } = req.params;
        // const { teacherId } = req.params;
        const { password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const userInfo = await decodeTokenT(token);
        // console.log(userInfo);
        const user = await teacherModel.findByIdAndUpdate(userInfo, { password: hash }, { new: true });
        const userConfirm = await teacherModel.findByIdAndUpdate(userInfo, { confirmPassword: hash }, { new: true });
        if (!user) {
            res.status(400).json({
                message: 'Could not Reset Password'
            })
        } else {
            res.status(200).json({
                message: "Password reset succesful.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


// Update School
const updateSchoolTeacher = async (req, res)=>{
    try {
        const {
            teacherName,
            teacherClass,
            teacherAge,
            teacherEmail,
        } = req.body;
        // const userLogo = req.file.path;
        const { teacherId } = req.params;
        const user = await teacherModel.findById(teacherId);
        if(!user) {
            res.status(404).json({
                message: 'Teacher not Found'
            })
        } else {
            const data = {
                teacherName: teacherName || user.teacherName,
                teacherClass: teacherClass || user.teacherClass,
                teacherAge: teacherAge || user.teacherAge,
                teacherEmail: teacherEmail || user.teacherEmail,
                teacherImage: user.teacherImage,
                password: user.password,
                confirmPassword: user.confirmPassword,
                link: user.link,
                students: user.students
            }
            if (req.files) {
                const userLogo = req.files.teacherImage.tempFilePath;
                const public_id = user.teacherImage.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(public_id);
                const newImage = await cloudinary.uploader.upload(userLogo)
                data.teacherImage = newImage.secure_url
                const updatedTeacherwithImage = await teacherModel.findByIdAndUpdate(teacherId, data, {new: true});
                if (!updatedTeacherwithImage) {
                    res.status(400).json({
                        message: 'Could not update Teacher Info with Image'
                    })
                } else {
                    res.status(200).json({
                        message: 'Successfully Updated Teacher Info with Image',
                        data: updatedTeacherwithImage
                    })
                }
            } else {
                const updatedTeacher = await teacherModel.findByIdAndUpdate(teacherId, data, {new: true});
                if (!updatedTeacher) {
                    res.status(400).json({
                        message: 'Could not update Teacher Info with Image'
                    })
                } else {
                    res.status(200).json({
                        message: 'Successfully Updated Teacher Info with Image',
                        data: updatedTeacher
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// Delete Teacher
const deleteSchoolTeacher = async (req, res)=>{
    try {
        const { teacherId } = req.params;
        const user = await teacherModel.findById(teacherId);
        if(!user) {
            res.status(404).json({
                message: 'User not Found'
            })
        } else {
            const public_id = user.teacherImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(public_id);
            const deletedTeacher = await teacherModel.findByIdAndDelete(teacherId);
            if (!deletedTeacher) {
                res.status(400).json({
                    message: 'Error deleting School, Try Again.'
                })
            } else {
                res.status(200).json({
                    message: 'School Successfully deleted',
                    data: user
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    };
}




// Sign Out
const signOutTeacher = async (req, res)=>{
    try {
        const { teacherId } = req.params;
        // const blacklist = [];
        // const hasAuthorization = req.headers.authorization;
        // const token = hasAuthorization.split(" ")[1];
        // blacklist.push(token); 
        // blacklist.push(hasAuthorization); 
        const logout = await teacherModel.findByIdAndUpdate(teacherId, {islogin: false}); 
        res.status(200).json({
            message: 'Logged out successfully'
        })
        // console.log()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// Read all Teachers
const readAllTeachers = async (req, res)=>{
    try {
        const teachers = await teacherModel.find()
        if (teachers == 0) {
            res.status(404).json({
                message: 'No teacher Record'
            })
        } else {
            res.status(200).json({
                message: 'All teachers Records',
                data: teachers
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// Read One Teacher
const readOneTeacher = async (req, res)=>{
    try {
        const teacherId = req.params.teacherId;
        const teachers = await teacherModel.findById(teacherId)
        if (teachers == 0) {
            res.status(404).json({
                message: 'No teacher Record'
            })
        } else {
            res.status(200).json({
                message: 'The teacher Record',
                data: teachers
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}















module.exports = {
    newTeacher,
    teacherLogin,
    changePasswordTeacher,
    forgotPasswordTeacher,
    resetPasswordTeacher,
    updateSchoolTeacher,
    deleteSchoolTeacher,
    signOutTeacher,
    readAllTeachers,
    readOneTeacher
}