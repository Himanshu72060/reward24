const mongoose = require("mongoose");

const featuredTaskBannerSchema = new mongoose.Schema(

    {
        backgroundImageUrl: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }

);

module.exports = mongoose.model(
    "FeaturedTaskBanner",
    featuredTaskBannerSchema
);