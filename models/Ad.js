const mongoose =
    require("mongoose");

const adSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        adType: {
            type: String,
            enum: [
                "video",
                "image"
            ],
            default: "video"
        },

        adUrl: {
            type: String,
            required: true
        },

        redirectUrl: {
            type: String,
            default: ""
        },

        duration: {
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

module.exports =
    mongoose.model(
        "Ad",
        adSchema
    );