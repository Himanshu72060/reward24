const mongoose = require("mongoose");

const coinHistorySchema =
    new mongoose.Schema(

        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            type: {
                type: String,
                enum: [
                    "signup",
                    "referral",
                    "reel",
                    "ad",
                    "spin",
                    "checkin",
                    "app_install",
                    "scratch_card",
                    "quiz",
                    "survey",
                    "withdraw",
                    "admin_reward",
                    "admin_deduct"
                ],
                required: true
            },

            coins: {
                type: Number,
                required: true
            },

            description: {
                type: String,
                default: ""
            }
        },

        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "CoinHistory",
        coinHistorySchema
    );