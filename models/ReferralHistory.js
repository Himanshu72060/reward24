const mongoose = require("mongoose");

const referralHistorySchema = new mongoose.Schema({

    userWhoEarned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    withdrawId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WithdrawRequest",
        required: true
    },

    level: {
        type: Number,
        enum: [1, 2],
        required: true
    },

    withdrawAmount: {
        type: Number,
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "ReferralHistory",
    referralHistorySchema
);