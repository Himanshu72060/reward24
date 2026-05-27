const mongoose =
    require("mongoose");

const rewardSchema =
    new mongoose.Schema(
        {

            coins: {
                type: String,
                required: true
            },

            title: {
                type: String,
                required: true
            },

            button: {
                type: String,
                required: true
            }

        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Reward",
        rewardSchema
    );