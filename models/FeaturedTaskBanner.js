const mongoose =
    require("mongoose");

const featuredTaskBannerSchema =
    new mongoose.Schema(
        {
            tagText: {
                type: String,
                default: "VIDEO TASK"
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

            taskImageUrl: {
                type: String,
                default: ""
            },

            startColorHex: {
                type: String,
                default: "#311B92"
            },

            endColorHex: {
                type: String,
                default: "#000000"
            },

            tagColorHex: {
                type: String,
                default: "#FF5252"
            },

            buttonText: {
                type: String,
                default: "START WATCHING"
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "FeaturedTaskBanner",
        featuredTaskBannerSchema
    );