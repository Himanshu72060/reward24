const mongoose = require("mongoose");

// ================= BANNER =================

const bannerSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    coinsText: {
        type: String,
        required: true
    }

}, { _id: false });

// ================= CHALLENGE =================

const challengeSchema = new mongoose.Schema({

    banner: {
        type: bannerSchema,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true,
        default: 0
    },

    isLocked: {
        type: Boolean,
        default: false
    },

    secondsLeft: {
        type: Number,
        default: 0
    },

    link: {
        type: String,
        required: true
    },

    totalJoined: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Challenge",
    challengeSchema
);