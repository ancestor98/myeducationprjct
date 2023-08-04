const userModel = require('../models/userModel');
const teacherModel = require('../models/teachersModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const cloudinary = require('../utilities/cloudinary');
const { genToken, decodeToken } = require('../utilities/jwt');
const emailSender = require('../middlewares/email');




const newTeacher = async (req, res)=>{
    try {
        const { token } = req.params;
        const { id } = req.params;
        await jwt.verify(token, process.env.JWT_SECRET, async (err)=>{
            if(err) {
                res.json('This link is Expired. Please, Inform your School Administrator to send you another registration Link.')
            } else {
                const user = await userModel.findById(id);
                const {
                    teacherName,
                    teacherClass,
                    teacherAge,
                    teacherEmail,
                    password,
                    confirmPassword
                } = req.body;
                // const teacherImage = req.file.path;
                const teacherImage = req.files.teacherImage.tempFilePath
                const uploadImage = await cloudinary.uploader.upload(teacherImage);
                if (password !== confirmPassword) {
                    res.status(400).json({
                        message: 'Make sure your Input Password corresponds with your Confirm Password'
                    })
                } else {
        
                    const isEmail = await teacherModel.findOne({teacherEmail});
                    if (isEmail) {
                        res.status(400).json({
                            message: `Teacher with this Email: ${teacherEmail} already exist.`
                        })
                    } else {
                        const salt = await bcrypt.genSalt(10);
                        const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const data = {
                            teacherName: teacherName.toUpperCase(),
                            teacherClass,
                            teacherAge,
                            teacherEmail: teacherEmail.toLowerCase(),
                            password: hashPassword,
                            confirmPassword: hashConfirmPassword,
                            teacherImage: uploadImage.secure_url
                        };
                        const teacher = await new teacherModel(data);
                        teacher.link = user;
                        savedTeacher = await teacher.save();
                        user.teachers.push(savedTeacher);
                        user.save();
                        // await fs.unlinkSync(req.file.path);
                        const subject = 'ProgressPal - welcome!';
                        const message = `Welcome to ProgressPal, we are pleased to have you ${savedTeacher.teacherName} work with your School: ${savedTeacher.link.schoolName} on this Platform to better the education system of Nigeria. Feel free to give us feedback on what needs to be improved on the platform. You can contact us on whatsapp with the Phone Number: +2348100335322. Thank you.`
                        emailSender({
                            email: teacherEmail,
                            subject,
                            message
                        })
                        res.status(200).json({
                            message: 'Teacher saved successfully',
                            savedTeacher
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


// Login
const teacherLogin = async (req, res)=>{
    try {
        const { teacherEmail, password } = req.body;
        const user = await teacherModel.findOne({teacherEmail});
        // console.log(user)
        if (!user) {
            res.status(404).json({
                message: `Teacher with Email: ${teacherEmail} not found.`
            });
        } else {
            const isPassword = await bcrypt.compare(password, user.confirmPassword);
            if(!isPassword) {
                res.status(400).json({
                    message: 'Incorrect Password'
                })
            } else {
                const token = await genToken(user._id, '30m');
                res.status(200).json({
                    message: 'Log in Successful',
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
        const { id } = req.params;
        const userPassword = await teacherModel.findById(id);
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
            const token = await genToken(isEmail._id, '30m')
            const subject = 'ProgressPal - Link for Reset password'
            const link = `${req.protocol}://${req.get('host')}/progressPal/reset-passwordTeacher/${isEmail._id}/${token}`
            const message = `Forgot your Password? it's okay, kindly use this link ${link} to re-set your account password. Please note that this link will expire after 5(five) Minutes.`
            emailSender({
                email: teacherEmail,
                subject,
                message
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
        const { id } = req.params;
        const { password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // const userInfo = await decodeToken(token);
        // console.log(userInfo);
        const user = await teacherModel.findByIdAndUpdate(id, { password: hash }, { new: true });
        const userConfirm = await teacherModel.findByIdAndUpdate(id, { confirmPassword: hash }, { new: true });
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
        const userLogo = req.files.teacherImage.tempFilePath;
        const { id } = req.params;
        const user = await teacherModel.findById(id);
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
            if (userLogo) {
                const public_id = user.teacherImage.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(public_id);
                const newImage = await cloudinary.uploader.upload(userLogo)
                console.log(newImage.secure_url)
                data.teacherImage = newImage.secure_url
                // await fs.unlinkSync(req.file.path);
                const updatedTeacherwithImage = await teacherModel.findByIdAndUpdate(id, data, {new: true});
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
                const updatedTeacher = await teacherModel.findByIdAndUpdate(id, data, {new: true});
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
        const { id } = req.params;
        const user = await teacherModel.findById(id);
        if(!user) {
            res.status(404).json({
                message: 'User not Found'
            })
        } else {
            const public_id = user.teacherImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(public_id);
            const deletedTeacher = await teacherModel.findByIdAndDelete(id);
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
        const { id } = req.params;
        const blacklist = [];
        const hasAuthorization = req.headers.authorization;
        const token = hasAuthorization.split(" ")[1];
        blacklist.push(token); 
        res.status(200).json({
            message: 'Logged out successfully'
        })
        console.log()
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