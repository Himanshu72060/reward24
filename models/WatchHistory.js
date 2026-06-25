const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        reelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reel",
            required: true,
            index: true,
        },

        watchedSeconds: {
            type: Number,
            default: 0,
            min: 0,
        },

        rewardGiven: {
            type: Boolean,
            default: false,
        },

        rewardCoins: {
            type: Number,
            default: 0,
            min: 0,
        },

        watchedAt: {
            type: Date,
            default: Date.now,
        },

        deviceId: {
            type: String,
            default: "",
        },

        ipAddress: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// One user can have only one watch record per reel
watchHistorySchema.index(
    { userId: 1, reelId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "WatchHistory",
    watchHistorySchema
);