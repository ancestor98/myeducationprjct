const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String
    },
    studentClass: {
        type: String
    },
    studentAge: {
        type: String
    },
    studentEmail: {
        type: String
    },
    password: {
        type: String
    },
    studentPassport: {
        type: String
    },
    token: {
        type: String
    },
    islogin: {
        type: Boolean,
        default: false
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers'
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "results"
    }]
});

const studentModel = mongoose.model('students', studentSchema);

module.exports = studentModel