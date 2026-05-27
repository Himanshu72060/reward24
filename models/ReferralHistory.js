const mongoose = require("mongoose");

const referralHistorySchema =
    new mongoose.Schema({

        referrerUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        newUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        referralCode: {
            type: String
        },

        rewardCoins: {
            type: Number,
            default: 100
        }

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "ReferralHistory",
        referralHistorySchema
    );