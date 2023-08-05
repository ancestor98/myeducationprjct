const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    subName1: {
        type: String
    },
    subName2: {
        type: String
    },
    subName3: {
        type: String
    },
    subName4: {
        type: String
    },
    subName5: {
        type: String
    },
    subName6: {
        type: String
    },
    subName7: {
        type: String
    },
    subName8: {
        type: String
    },
    subName9: {
        type: String
    },
    subName10: {
        type: String
    },
    subScore1: {
        type: String
    },
    subScore2: {
        type: String
    },
    subScore3: {
        type: String
    },
    subScore4: {
        type: String
    },
    subScore5: {
        type: String
    },
    subScore6: {
        type: String
    },
    subScore7: {
        type: String
    },
    subScore8: {
        type: String
    },
    subScore9: {
        type: String
    },
    subScore10: {
        type: String
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }
});

const resultModel = mongoose.model('results', resultSchema);

// module.exports = resultModel