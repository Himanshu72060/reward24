const mongoose = require("mongoose");

// ================= REWARDED AD =================

const rewardedAdSchema = new mongoose.Schema({

    platform: {
        type: String,
        enum: ["android", "ios"],
        required: true
    },

    adUnitId: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

});

// ================= MAIN CONFIG =================

const adConfigSchema = new mongoose.Schema({

    appId: {
        type: String,
        required: true,
        trim: true
    },

    rewardedAds: [rewardedAdSchema],

    // Reel open hone ke kitne second baad next ad dikhani hai
    adIntervalSeconds: {
        type: Number,
        default: 5
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "AdConfig",
    adConfigSchema
);

