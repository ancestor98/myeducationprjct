const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String
    },
    teacherClass: {
        type: String
    },
    teacherAge: {
        type: String
    },
    teacherEmail: {
        type: String
    },
    teacherImage: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    }]
});

const teacherModel = mongoose.model('teachers', teacherSchema);

module.exports = teacherModel
