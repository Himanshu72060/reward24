const mongoose =
    require("mongoose");

const scratchRewardSchema =
    new mongoose.Schema({

        success: {

            type: Boolean,

            default: true
        },

        rewardAmount: {

            type: Number,

            required: true
        },

        updatedTotalCoins: {

            type: Number,

            required: true
        },

        message: {

            type: String,

            required: true
        }

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "ScratchReward",
        scratchRewardSchema
    );