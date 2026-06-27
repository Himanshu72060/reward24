const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    amount: {
        type: String,
        required: true,
        trim: true
    },

    requiredCoins: {
        type: Number,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    color: {
        type: String,
        default: "0xFF232F3E"
    },

    isRedeemed: {
        type: Boolean,
        default: false
    },

    redeemedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    redeemedAt: {
        type: Date,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "GiftCard",
    giftCardSchema
);