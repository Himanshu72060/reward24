const mongoose = require("mongoose");

const dailyStreakSchema =
    new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        streakDay: {
            type: Number,
            default: 1
        },

        rewardCoins: {
            type: Number,
            required: true
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "DailyStreak",
        dailyStreakSchema
    );