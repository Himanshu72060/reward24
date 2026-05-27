const mongoose = require("mongoose");

const surveyPartnerSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    color: String
});

const surveyTileSchema = new mongoose.Schema({
    title: String,
    time: String,
    coins: String,
    color: String,
    provider: String
});

const surveyGuidelineSchema = new mongoose.Schema({
    title: String,
    description: String
});

const cintSurveySchema = new mongoose.Schema({
    title: String,
    description: String,
    coins: String,
    time: String,
    url: String,
    isHot: {
        type: Boolean,
        default: false
    }
});

const surveySchema = new mongoose.Schema(
    {
        screenTitle: {
            type: String,
            required: true
        },

        partners: [surveyPartnerSchema],

        surveySections: [
            {
                sectionName: String,

                tiles: [surveyTileSchema],

                guidelines: [surveyGuidelineSchema],

                cintSurveys: [cintSurveySchema]
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Survey", surveySchema);