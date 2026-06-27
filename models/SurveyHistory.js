const mongoose = require("mongoose");

const surveyHistorySchema = new mongoose.Schema({

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

    provider: {

        type: String,

        required: true

    },

    rewardCoins: {

        type: Number,

        required: true

    },

    status: {

        type: String,

        enum: [

            "completed"

        ],

        default: "completed"

    }

}, {

    timestamps: true

});

surveyHistorySchema.index(

    {

        userId: 1,

        surveyId: 1,

        provider: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(

    "SurveyHistory",

    surveyHistorySchema

);