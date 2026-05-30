const mongoose =
    require("mongoose");

const activitySchema =
    new mongoose.Schema({

        title: String,

        value: String,

        iconKey: String,

        colorHex: String

    });

const weeklySchema =
    new mongoose.Schema({

        label: String,

        barHeightPercentage: Number,

        isActive: Boolean

    });

const userStatsSchema =
    new mongoose.Schema({

        totalBalanceCoins: {
            type: Number,
            default: 0
        },

        estimatedValuationInInr: {
            type: Number,
            default: 0
        },

        activities: [
            activitySchema
        ],

        weeklyHistory: [
            weeklySchema
        ]

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "UserStats",
        userStatsSchema
    );