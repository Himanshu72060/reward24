const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        videoUrl: {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        // Coins user will earn after completing watch time
        coins: {
            type: Number,
            default: 1,
            min: 1,
        },

        // Minimum seconds user must watch
        watchTime: {
            type: Number,
            default: 30,
            min: 1,
        },

        likes: {
            type: Number,
            default: 0,
            min: 0,
        },

        shares: {
            type: Number,
            default: 0,
            min: 0,
        },

        views: {
            type: Number,
            default: 0,
            min: 0,
        },

        adAfter: {
            type: Boolean,
            default: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reel", reelSchema);