const mongoose =
    require("mongoose");

const giftCardSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true
        },

        amount: {
            type: String,
            required: true
        },

        code: {
            type: String,
            required: true
        },

        color: {
            type: String,
            default: "0xFF232F3E"
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "GiftCard",
        giftCardSchema
    );