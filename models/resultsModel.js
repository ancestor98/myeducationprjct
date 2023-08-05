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
    subTest1: {
        type: String
    },
    subTest2: {
        type: String
    },
    subTest3: {
        type: String
    },
    subTest4: {
        type: String
    },
    subTest5: {
        type: String
    },
    subTest6: {
        type: String
    },
    subTest7: {
        type: String
    },
    subTest8: {
        type: String
    },
    subTest9: {
        type: String
    },
    subTest10: {
        type: String
    },
    subExam1: {
        type: String
    },
    subExam2: {
        type: String
    },
    subExam3: {
        type: String
    },
    subExam4: {
        type: String
    },
    subExam5: {
        type: String
    },
    subExam6: {
        type: String
    },
    subExam7: {
        type: String
    },
    subExam8: {
        type: String
    },
    subExam9: {
        type: String
    },
    subExam10: {
        type: String
    },
    subTotal1: {
        type: String
    },
    subTotal2: {
        type: String
    },
    subTotal3: {
        type: String
    },
    subTotal4: {
        type: String
    },
    subTotal5: {
        type: String
    },
    subTotal6: {
        type: String
    },
    subTotal7: {
        type: String
    },
    subTotal8: {
        type: String
    },
    subTotal9: {
        type: String
    },
    subTotal10: {
        type: String
    },
    resultTotal: {
        type: String
    },
    teachersRemark: {
        type: String
    },
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }
});

const resultModel = mongoose.model('results', resultSchema);

module.exports = resultModel