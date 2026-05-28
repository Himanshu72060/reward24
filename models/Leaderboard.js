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

// MAIN LEADERBOARD

const leaderboardSchema =
    new mongoose.Schema({

        category: {

            type: String,

            enum: [
                "daily",
                "weekly",
                "monthly",
                "alltime"
            ],

            required: true

        },

        topUsers: [
            leaderboardUserSchema
        ],

        userRankStatus:
            userRankStatusSchema

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "Leaderboard",
        leaderboardSchema
    );