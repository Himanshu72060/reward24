const mongoose =
    require("mongoose");

const redeemSchema =
    new mongoose.Schema({

        userId: {
            type:
                mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        voucherId: {
            type: String,
            required: true
        },

        voucherName: {
            type: String,
            required: true
        },

        voucherValue: {
            type: Number,
            required: true
        },

        coinsUsed: {
            type: Number,
            required: true
        },

        redeemCode: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Success"
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Redeem",
        redeemSchema
    );