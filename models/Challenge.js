const mongoose =
    require("mongoose");

// ================= BANNER =================

const bannerSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        coinsText: {
            type: String,
            required: true
        }

    });

// ================= CHALLENGE =================

const challengeSchema =
    new mongoose.Schema({

        banner: bannerSchema,

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        reward: {
            type: String,
            required: true
        },

        isLocked: {
            type: Boolean,
            default: false
        },

        secondsLeft: {
            type: Number,
            default: 0
        },

        link: {
            type: String,
            required: true
        }

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "Challenge",
        challengeSchema
    );