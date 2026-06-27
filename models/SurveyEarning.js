const mongoose = require("mongoose");


const surveyEarningSchema =
    new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        surveyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Survey",
            required: true
        },


        coins: {
            type: Number,
            required: true
        },


        status: {
            type: String,
            default: "completed"
        }


    }, {
        timestamps: true
    });


module.exports =
    mongoose.model(
        "SurveyEarning",
        surveyEarningSchema
    );