const mongoose = require("mongoose");

const coinTransactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    coins: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: [
            "reward",
            "watch_ad",
            "daily_checkin",
            "spin",
            "referral",
            "bonus",
            "withdraw",
            "purchase",
            "reel_watch",
            "reel_upload",
            "survey",
        ],
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "completed",
            "rejected"
        ],
        default: "completed"
    },

    description: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "CoinTransaction",
    coinTransactionSchema
);