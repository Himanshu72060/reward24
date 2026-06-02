const mongoose = require("mongoose");

// 🔹 Payment Method Schema
const paymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Enter coins"
    },

    hintText: {
        type: String,
        required: true,
        default: "UPI ID / Account Number"
    },

    selectMethod: {
        type: String,
        required: true,
        enum: ["UPI", "BANK", "CARD", "WALLET"],
        default: "UPI"
    }
});

// 🔹 Wallet Config Schema
const walletConfigSchema = new mongoose.Schema({
    minWithdrawCoins: {
        type: Number,
        default: 1000
    },
    rateCoins: {
        type: Number,
        default: 1000
    },
    rateRupees: {
        type: Number,
        default: 200
    },

    rules: [
        {
            type: String
        }
    ],

    paymentMethods: {
        type: [paymentMethodSchema],
        default: []
    }

}, { timestamps: true });

module.exports = mongoose.model("WalletConfig", walletConfigSchema);