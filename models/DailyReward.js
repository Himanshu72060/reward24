const mongoose =
    require("mongoose");

// ================= REWARD ITEM =================

const rewardItemSchema =
    new mongoose.Schema({

        day: {
            type: Number,
            required: true
        },

        coins: {
            type: Number,
            required: true
        },

        isMega: {
            type: Boolean,
            default: false
        }

    });

// ================= DAILY REWARD =================

const dailyRewardSchema =
    new mongoose.Schema({

        totalCoins: {
            type: Number,
            required: true
        },

        todayEarnedCoins: {
            type: Number,
            required: true
        },

        currentStreakDay: {
            type: Number,
            required: true
        },

        maxDailyTarget: {
            type: Number,
            required: true
        },

        rewardsList: [
            rewardItemSchema
        ]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "DailyReward",
        dailyRewardSchema
    );