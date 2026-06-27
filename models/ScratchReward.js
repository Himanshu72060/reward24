const mongoose = require("mongoose");

const scratchRewardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    rewardCoins: {
        type: Number,
        required: true,
        min: 1
    },

    image: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    },

    totalClaims: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "ScratchReward",
    scratchRewardSchema
);