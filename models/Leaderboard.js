const mongoose =
    require("mongoose");

const leaderboardSchema =
    new mongoose.Schema({

        category: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "LeaderboardCategory",

            required: true
        },

        name: {

            type: String,

            required: true
        },

        amount: {

            type: String,

            required: true
        },

        username: {

            type: String,

            required: true
        },

        rank: {

            type: String,

            required: true
        },

        totalEarned: {

            type: String,

            required: true
        }

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "Leaderboard",
        leaderboardSchema
    );