const mongoose =
    require("mongoose");

// TOP USERS

const leaderboardUserSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        amount: {
            type: String,
            required: true
        }

    });

// WINNER BANNER

const winnerBannerSchema =
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
        }

    });

// USER RANK STATUS

const userRankStatusSchema =
    new mongoose.Schema({

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

    });

// MAIN MODEL

const leaderboardSchema =
    new mongoose.Schema({

        type: {
            type: String,
            enum: [
                "daily",
                "weekly",
                "monthly",
                "alltime"
            ],
            required: true
        },

        winnerBanner:
            winnerBannerSchema,

        topThreeUsers:
            [leaderboardUserSchema],

        userRankStatus:
            userRankStatusSchema,

        leaderboardUsers:
            [leaderboardUserSchema]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "Leaderboard",
        leaderboardSchema
    );