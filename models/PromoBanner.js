const mongoose = require("mongoose");

const promoBannerSchema =
    new mongoose.Schema(
        {


            backgroundImageUrl: {
                type: String,
                default: ""
            },


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