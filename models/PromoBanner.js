const mongoose = require("mongoose");

const promoBannerSchema =
    new mongoose.Schema(
        {
            tagText: {
                type: String,
                default: "LIMITED OFFER"
            },

            title: {
                type: String,
                required: true
            },

            subtitle: {
                type: String,
                default: ""
            },

            backgroundImageUrl: {
                type: String,
                default: ""
            },

            foregroundImageUrl: {
                type: String,
                default: ""
            },

            startColorHex: {
                type: String,
                default: "#1D1B4B"
            },

            endColorHex: {
                type: String,
                default: "#4338CA"
            },

            buttonText: {
                type: String,
                default: "REFER NOW"
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "PromoBanner",
        promoBannerSchema
    );