const mongoose =
    require("mongoose");

const reelSchema =
    new mongoose.Schema({

        userId: {
            type:
                mongoose.Schema.Types.ObjectId,
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

        coins: {
            type: Number,
            default: 1
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

        adAfter: {
            type: Boolean,
            default: true
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Reel",
        reelSchema
    );