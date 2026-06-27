const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        default: ""
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    videoUrl: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        default: ""
    },

    // Coins after successful completion
    coins: {
        type: Number,
        default: 1
    },

    // Minimum seconds user must watch
    watchTime: {
        type: Number,
        default: 30
    },

    category: {
        type: String,
        default: "general"
    },

    likes: {
        type: Number,
        default: 0
    },

    shares: {
        type: Number,
        default: 0
    },

    views: {
        type: Number,
        default: 0
    },

    totalRewardsGiven: {
        type: Number,
        default: 0
    },

    // Show Rewarded Ad before reel
    adBeforeStart: {
        type: Boolean,
        default: true
    },

    // Show Interstitial after 5 sec
    adAfterFiveSeconds: {
        type: Boolean,
        default: true
    },

    // Optional: reward only after ad watched
    rewardAfterAd: {
        type: Boolean,
        default: true
    },

    isApproved: {
        type: Boolean,
        default: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

reelSchema.index({
    createdAt: -1
});

module.exports = mongoose.model("Reel", reelSchema);