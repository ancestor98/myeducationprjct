const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    resultName: {
        type: String
    },
    resultYear: {
        type: String
    },
    resultDescription: {
        type: String
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    }]
});

const resultModel = mongoose.model('results', resultSchema);

module.exports = resultModel