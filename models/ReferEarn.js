const mongoose =
    require("mongoose");

// ================= STEP MODEL =================

const referStepSchema =
    new mongoose.Schema({

        stepNumber: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        }

    });

// ================= MAIN MODEL =================

const referEarnSchema =
    new mongoose.Schema({

        referralCode: {
            type: String,
            required: true
        },

        appLink: {
            type: String,
            required: true
        },

        bannerText: {
            type: String,
            required: true
        },

        shareMessageTemplate: {
            type: String,
            required: true
        },

        steps: [
            referStepSchema
        ]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "ReferEarn",
        referEarnSchema
    );