const mongoose = require("mongoose");

// ================= GAME STEP =================

const gameStepSchema = new mongoose.Schema({

    stepId: {
        type: String,
        required: true
    },

    stepTitle: {
        type: String,
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true
    }

}, { _id: true });


// ================= RULE CARD =================

const ruleCardSchema = new mongoose.Schema({

    icon: {
        type: String,
        default: ""
    },

    title: {
        type: String,
        required: true
    },

    sub: {
        type: String,
        default: ""
    }

}, { _id: true });


// ================= CAMPAIGN DETAIL =================

const campaignDetailSchema = new mongoose.Schema({

    steps: [gameStepSchema],

    instructions: [{
        type: String
    }],

    rules: [ruleCardSchema]

}, { _id: true });


// ================= GAME =================

const gameSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    subTitle: {

        type: String,

        required: true

    },

    rating: {

        type: String,

        default: "0"

    },

    imageUrl: {

        type: String,

        required: true

    },

    accentColor: {

        type: String,

        default: "#4CAF50"

    },

    playStoreUrl: {

        type: String,

        required: true

    },

    campaignDetails: [campaignDetailSchema],

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
    "Game",
    gameSchema
);