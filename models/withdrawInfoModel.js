const mongoose =
    require("mongoose");

const withdrawInfoSchema =
    new mongoose.Schema({

        type: {
            type: String,
            enum: [
                "upi",
                "bank"
            ],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "WithdrawInfo",
        withdrawInfoSchema
    );