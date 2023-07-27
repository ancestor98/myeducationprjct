const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const genToken = async (id, time)=>{
    const token = await jwt.sign(
        {
            userID: id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: time
        }
    )
    return token;
};

const decodeToken = async (token)=>{
    let user = null;
    await jwt.verify(token, process.env.JWT_SECRET, async (err, data)=>{
        if(err) {
            throw err;
        } else {
            user = await userModel.findById(data.userID);
        }
    })
    return user;
};

module.exports = {
    genToken,
    decodeToken
};