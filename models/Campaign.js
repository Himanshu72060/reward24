const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        subtitle: {
            type: String,
            required: true
        },

        coins: {
            type: Number,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        playStoreUrl: {
            type: String,
            required: true
        },

        categories: [
            {
                categoryName: {
                    type: String
                },

                tasks: [
                    {
                        title: String,
                        subtitle: String,
                        coins: Number,
                        imageUrl: String,
                        playStoreUrl: String
                    }
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campaign", campaignSchema);