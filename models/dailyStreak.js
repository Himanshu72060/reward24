const mongoose = require("mongoose");

const dailyStreakSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    day: {
        type: Number,
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "claimed"
        ],
        default: "claimed"
    },

    claimedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

// One user can claim one day only once
dailyStreakSchema.index(
    {
        userId: 1,
        day: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "DailyStreak",
    dailyStreakSchema
);