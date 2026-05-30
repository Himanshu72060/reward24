const mongoose =
    require("mongoose");

const referralSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        joiningDate: {
            type: String,
            required: true
        },

        rewardCoins: {
            type: String,
            default: "0"
        }

    });

const networkSchema =
    new mongoose.Schema({

        totalFriends: {
            type: Number,
            default: 0
        },

        totalCoinsEarned: {
            type: Number,
            default: 0
        },

        referralsList: [
            referralSchema
        ]

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Network",
        networkSchema
    );