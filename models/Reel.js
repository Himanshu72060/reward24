const mongoose =
    require("mongoose");

const reelSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true
            },

            videoUrl: {
                type: String,
                required: true
            },

            thumbnail: {
                type: String
            },

            coins: {
                type: Number,
                default: 10
            },

            adAfter: {
                type: Boolean,
                default: true
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Reel",
        reelSchema
    );