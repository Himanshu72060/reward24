const mongoose = require("mongoose");

const dailyStreakConfigSchema = new mongoose.Schema({

    day: {
        type: Number,
        required: true,
        unique: true
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "DailyStreakConfig",
    dailyStreakConfigSchema
);