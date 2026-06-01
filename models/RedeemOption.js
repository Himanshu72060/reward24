const mongoose =
    require("mongoose");

const redeemOptionSchema =
    new mongoose.Schema({

        brandName: {
            type: String,
            required: true
        },

        rupees: {
            type: Number,
            required: true
        },

        coins: {
            type: Number,
            required: true
        },

        imageUrl: {
            type: String,
            default: ""
        },

        redeemSteps: [{
            type: String
        }],

        termsAndConditions: {
            type: String,
            default: ""
        },

        isActive: {
            type: Boolean,
            default: true
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "RedeemOption",
        redeemOptionSchema
    );