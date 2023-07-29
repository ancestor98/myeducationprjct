const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseName: {
        type: String
    },
    courseParticipation: {
        type: String
    },
    courseAssignment: {
        type: String
    },
    courseAttendance: {
        type: String
    },
    courseTest: {
        type: String
    },
    courseExam: {
        type: String
    },
    courseOverall: {
        type: String
    },
    courseGrade: {
        type: String
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'results'
    }
});

const courseModel = mongoose.model('courses', courseSchema);

module.exports = courseModel