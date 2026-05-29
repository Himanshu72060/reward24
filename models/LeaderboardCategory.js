const mongoose =
    require("mongoose");

const leaderboardCategorySchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },

        status: {
            type: Boolean,
            default: true
        }

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "LeaderboardCategory",
        leaderboardCategorySchema
    );