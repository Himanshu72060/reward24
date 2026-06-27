const mongoose = require("mongoose");

// ================= PARTNER =================

const surveyPartnerSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true

    },

    imgUrl: {

        type: String,

        required: true

    },

    color: {

        type: String,

        default: "#4CAF50"

    }

}, { _id: true });


// ================= SURVEY TILE =================

const surveyTileSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    time: {

        type: String,

        required: true

    },

    rewardCoins: {

        type: Number,

        required: true

    },

    color: {

        type: String,

        default: "#4CAF50"

    },

    provider: {

        type: String,

        required: true

    }

}, { _id: true });


// ================= GUIDELINE =================

const surveyGuidelineSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    description: {

        type: String,

        required: true

    }

}, { _id: true });


// ================= CINT SURVEY =================

const cintSurveySchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    description: {

        type: String,

        required: true

    },

    rewardCoins: {

        type: Number,

        required: true

    },

    time: {

        type: String,

        required: true

    },

    url: {

        type: String,

        required: true

    },

    isHot: {

        type: Boolean,

        default: false

    }

}, { _id: true });


// ================= SURVEY SECTION =================

const surveySectionSchema = new mongoose.Schema({

    sectionName: {

        type: String,

        required: true

    },

    tiles: [

        surveyTileSchema

    ],

    guidelines: [

        surveyGuidelineSchema

    ],

    cintSurveys: [

        cintSurveySchema

    ]

}, { _id: true });


// ================= MAIN MODEL =================

const surveySchema = new mongoose.Schema({

    screenTitle: {

        type: String,

        required: true

    },

    partners: [

        surveyPartnerSchema

    ],

    surveySections: [

        surveySectionSchema

    ],

    totalCompleted: {

        type: Number,

        default: 0

    },

    isActive: {

        type: Boolean,

        default: true

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(

    "Survey",

    surveySchema

);