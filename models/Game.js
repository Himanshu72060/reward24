const mongoose =
    require("mongoose");

// GAME STEPS

const gameStepSchema =
    new mongoose.Schema({

        id: String,

        stepTitle: String,

        stepCoins: String

    });

// RULES

const ruleCardSchema =
    new mongoose.Schema({

        icon: String,

        title: String,

        sub: String

    });

// CAMPAIGN DETAILS

const campaignDetailSchema =
    new mongoose.Schema({

        steps: [
            gameStepSchema
        ],

        instructions: [String],

        rules: [
            ruleCardSchema
        ]

    });

// GAME MODEL

const gameSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        subTitle: {
            type: String,
            required: true
        },

        rating: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        accentColor: {
            type: String,
            required: true
        },

        playStoreUrl: {
            type: String,
            required: true
        },

        campaignDetails: [
            campaignDetailSchema
        ]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "Game",
        gameSchema
    );