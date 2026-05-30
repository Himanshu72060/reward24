const mongoose =
    require("mongoose");

const campaignDetailSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        subtitle: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        coins: {
            type: Number,
            default: 0
        },

        playStoreUrl: {
            type: String,
            default: ""
        },

        watchVideoUrl: {
            type: String,
            default: ""
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "CampaignDetail",
        campaignDetailSchema
    );