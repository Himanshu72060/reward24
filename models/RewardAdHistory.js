const mongoose = require("mongoose");

const rewardAdHistorySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    adConfigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdConfig",
        required: true
    },

    platform: {
        type: String,
        enum: ["android", "ios"]
    },

    earnedCoins: {
        type: Number,
        required: true
    },

    adUnitId: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "RewardAdHistory",
    rewardAdHistorySchema
);