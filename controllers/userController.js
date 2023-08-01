require('dotenv').config();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const cloudinary = require('../utilities/cloudinary');
const { genToken, decodeToken } = require('../utilities/jwt');
const emailSender = require('../middlewares/email');


// Register a School
const register = async (req, res)=>{
    try {
        const {
            schoolName,
            schoolEmail,
            schoolAddress,
            state,
            country,
            schoolLogo,
            regNo,
            password,
            confirmPassword,
            website,
        } = req.body;
        // console.log(req.file)
        // const userLogo = req.file.path;
        const userLogo = req.files.schoolLogo.tempFilePath
        const uploadLogo = await cloudinary.uploader.upload(userLogo);

        if (password !== confirmPassword) {
            res.status(400).json({
                message: 'Make sure your Input Password corresponds with your Confirm Password'
            })
        } else {
            const isEmail = await userModel.findOne({schoolEmail});
            if (isEmail) {
                res.status(400).json({
                    message: `School with this Email: ${schoolEmail} already exist.`
                })
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);
                const hashPassword = await bcrypt.hash(password, salt);
                const data = {
                    schoolName: schoolName.toUpperCase(),
                    schoolEmail: schoolEmail.toLowerCase(),
                    schoolAddress,
                    state,
                    country,
                    schoolLogo: uploadLogo.secure_url,
                    regNo,
                    password: hashPassword,
                    confirmPassword: hashConfirmPassword,
                    website
                }
                const user = new userModel(data);
                const savedUser = await user.save();
                const token = await genToken(savedUser._id, '3m');
                // await fs.unlinkSync(req.file.path);
                const subject = 'ProgressPal - Kindly Verify your School Registration'
                const link = `${req.protocol}://${req.get('host')}/progressPal/verify/${savedUser._id}/${token}`
                const message = `Welcome to ProgressPal, we are pleased to work with your School: ${schoolName} to better the education system of Nigeria. Kindly use this link: ${link} to verify your school account. Kindly note that this link will expire after 5(five) Minutes.`
                emailSender({
                    email: schoolEmail,
                    subject,
                    message
                })
                if (!savedUser) {
                    res.status(400).json({
                        message: `Failed to create School account, Try Again.`
                    })
                } else {
                    res.status(201).json({
                        message: `${schoolName} has been successfully registered. Check your School Email to verify your account.`,
                        user: savedUser
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




// Verify Email
const verifyEmail = async (req, res)=>{
    try {
        const { token } = req.params;
        const { id } = req.params;
        await jwt.verify(token, process.env.JWT_SECRET, async (err)=>{
            if(err) {
                res.json('This link is Expired. Send another Email Verification.')
            } else {
                const verify = await userModel.findByIdAndUpdate(id, {isVerified: true});
                if (!verify) {
                    res.status(403).json({
                        message: 'User not verified, please try again.'
                    })
                } else {
                    res.status(200).json({
                        messge: `School with Email: ${verify.schoolEmail} verified successfully`
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// Re-Send Email Verification
const resendEmailVerification = async (req, res)=>{
    try {
        const { schoolEmail } = req.body;
        const user = await userModel.findOne({schoolEmail});
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        } else {
            if (user.isVerified == true) {
                res.status(200).json({
                    message: 'Already Verified!'
                })
            } else {
                const token = await genToken(user._id, '3m')
                const subject = 'ProgressPal - Kindly Verify your School Registration'
                const link = `${req.protocol}://${req.get('host')}/progressPal/verify/${user._id}/${token}`
                const message = `Welcome to ProgressPal, we are pleased to work with your School: ${user.schoolName} to better the education system of Nigeria. Kindly use this link: ${link} to verify your school account. Kindly note that this link will expire after 5(five) Minutes.`
                emailSender({
                    email: user.schoolEmail,
                    subject,
                    message
                })
                res.status(201).json({
                    message: `${user.schoolName} has been successfully registered. Check your School Email to verify your account.`,
                    user: user
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



// sign in
const logIn = async(req, res)=>{
    try {
        const { schoolEmail, password } = req.body;
        const user = await userModel.findOne({schoolEmail});
        if (!user) {
            res.status(404).json({
                message: 'School not found'
            });
        } else {
            if(!user.isVerified) {
                const token = await genToken(user._id, '3m')
                const subject = 'ProgressPal - Kindly Verify your School Registration'
                const link = `${req.protocol}://${req.get('host')}/progressPal/verify/${user._id}/${token}`
                const message = `Welcome to ProgressPal, we are pleased to work with your School: ${user.schoolName} to better the education system of Nigeria. Kindly use this link: ${link} to verify your school account. Kindly note that this link will expire after 5(five) Minutes.`
                emailSender({
                    email: user.schoolEmail,
                    subject,
                    message
                })
                res.status(400).json({
                    message: `School: ${user.schoolName} not verified, Please, check your email for link to verify your account`
                })
            } else {
                const isPassword = await bcrypt.compare(password, user.confirmPassword);
                if(!isPassword) {
                    res.status(400).json({
                        message: 'Incorrect Password'
                    });
                } else {
                    const token = await genToken(user._id, '30m');
                    res.status(200).json({
                        message: 'Log in Successful',
                        token: token
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { id } = req.params;
        const userPassword = await userModel.findById(id);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newPassword = await userModel.findByIdAndUpdate(userPassword, {password: hash}, {new: true});
        const newConfirmPassword = await userModel.findByIdAndUpdate(userPassword, {confirmPassword: hash}, {new: true});
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



const forgotPassword = async (req, res)=>{
    try {
        const { schoolEmail } = req.body;
        const isEmail = await userModel.findOne({ schoolEmail });
        if (!isEmail) {
            res.status(404).json({
                message: 'School Email not found'
            })
        } else {
            const token = await genToken(isEmail._id, '3m')
            const subject = 'ProgressPal - Link for Reset password'
            const link = `${req.protocol}://${req.get('host')}/progressPal/reset-password/${isEmail._id}/${token}`
            const message = `Forgot your Password? it's okay, kindly use this link ${link} to re-set your account password. Please note that this link will expire after 5(five) Minutes.`
            emailSender({
                email: schoolEmail,
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



const resetPassword = async (req, res)=>{
    try {
        const { token } = req.params;
        const { password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const userInfo = await decodeToken(token);
        const user = await userModel.findByIdAndUpdate(userInfo._id, { password: hash }, { new: true });
        const userConfirm = await userModel.findByIdAndUpdate(userInfo._id, { confirmPassword: hash }, { new: true });
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
}



// Link for Registering a Teacher on ProgressPal.
const teacherLink = async (req, res)=>{
    try {
        const { teacherEmail } = req.body;
        const { id } = req.params;
        const school = await userModel.findById(id);
        const token = await genToken(id, '30m');
        const subject = 'ProgressPal - Teacher Registration'
        const link = `${req.protocol}://${req.get('host')}/progressPal/newTeacher/${id}/${token}`
        const message = `Welcome to ProgressPal, you are now a teacher with ${school.schoolName},. Kindly follow the link: ${link} below to finalize your registration on ProgressPal. Please note that this link will expire after 5(five) Minutes.`
        emailSender({
            email: teacherEmail,
            subject,
            message
        })
        res.status(200).json({
            message: `Link for registration successfully sent to ${teacherEmail}`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}






const updateSchool = async (req, res)=>{
    try {
        const {
            schoolName,
            schoolEmail,
            schoolAddress,
            state,
            country,
            schoolLogo,
            regNo,
            website,
        } = req.body;
        // const userLogo = req.file.path;
        const userLogo = req.files.schoolLogo.tempFilePath
        const { id } = req.params;
        const user = await userModel.findById(id);

        if(!user) {
            res.status(404).json({
                message: 'User not Found'
            })
        } else {
            const data = {
                schoolName: schoolName || user.schoolName,
                schoolEmail: schoolEmail || user.schoolEmail,
                schoolAddress: schoolAddress || user.schoolAddress,
                state: state || user.state,
                country: country || user.country,
                schoolLogo: schoolLogo || user.schoolLogo,
                regNo: user.regNo,
                password: user.password,
                confirmPassword: user.confirmPassword,
                website: website || user.website,
                isAdmin: user.isAdmin,
                isSuperAdmin: user.isSuperAdmin,
                isVerified: user.isVerified,
                teachers: user.teachers
            }

            if (userLogo) {
                const public_id = user.schoolLogo.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(public_id);
                const newLogo = await cloudinary.uploader.upload(userLogo)
                console.log(newLogo.secure_url)
                data.schoolLogo = newLogo.secure_url
                // await fs.unlinkSync(req.file.path);
                const updatedSchoolwithLogo = await userModel.findByIdAndUpdate(id, data, {new: true});
                if (!updatedSchoolwithLogo) {
                    res.status(400).json({
                        message: 'Could not update School Info with Logo'
                    })
                } else {
                    res.status(200).json({
                        message: 'Successfully Updated School Info with Logo',
                        data: updatedSchoolwithLogo
                    })
                }
            } else {
                const updatedSchool = await userModel.findByIdAndUpdate(id, data, {new: true});
                if (!updatedSchool) {
                    res.status(400).json({
                        message: 'Could not update School Info'
                    })
                } else {
                    res.status(200).json({
                        message: 'Successfully Updated School Info',
                        data: updatedSchool
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




const deleteSchool = async (req, res)=>{
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if(!user) {
            res.status(404).json({
                message: 'User not Found'
            })
        } else {
            const public_id = user.schoolLogo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(public_id);
            const deletedSchool = await userModel.findByIdAndDelete(id);
            if (!deletedSchool) {
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
const signOut = async (req, res)=>{
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








module.exports = { 
    register,
    verifyEmail ,
    resendEmailVerification,
    logIn,
    signOut,
    changePassword,
    forgotPassword,
    resetPassword,
    updateSchool,
    deleteSchool,
    teacherLink
};
