const mongoose =
    require("mongoose");

const userProfileSchema =
    new mongoose.Schema(

        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            name: {
                type: String,
                required: true
            },

            avatarUrl: {
                type: String,
                required: true
            },

            totalCoins: {
                type: Number,
                default: 0
            },

            currentStreakDays: {
                type: Number,
                default: 0
            },

            isTodayClaimed: {
                type: Boolean,
                default: false
            },

            availableWithdraw: {
                type: Number,
                default: 0
            },

            pendingCoins: {
                type: Number,
                default: 0
            },

            totalEarned: {
                type: Number,
                default: 0
            }

        },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "UserProfile",
        userProfileSchema
    );