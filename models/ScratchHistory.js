const mongoose = require("mongoose");

const scratchHistorySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    scratchRewardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScratchReward",
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["claimed"],
        default: "claimed"
    }

}, {
    timestamps: true
});

// Prevent duplicate claim of the same scratch card
scratchHistorySchema.index(
    {
        userId: 1,
        scratchRewardId: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "ScratchHistory",
    scratchHistorySchema
);