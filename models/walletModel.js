const mongoose = require("mongoose");

// Payment Method Schema
const paymentMethodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        default: "Enter Coins"
    },

    hintText: {
        type: String,
        required: true,
        default: "UPI ID / Account Number"
    },

    selectMethod: {
        type: String,
        enum: ["UPI", "BANK", "CARD", "WALLET"],
        default: "UPI"
    }

}, { _id: false });


// Wallet Config Schema
const walletConfigSchema = new mongoose.Schema({

    // Minimum coins required to withdraw
    minWithdrawCoins: {
        type: Number,
        default: 1000
    },

    // Conversion Rate
    rateCoins: {
        type: Number,
        default: 1000
    },

    rateRupees: {
        type: Number,
        default: 100
    },

    // Withdraw charges
    withdrawCharge: {
        type: Number,
        default: 0
    },

    // Maximum withdraw per day
    maxWithdrawPerDay: {
        type: Number,
        default: 5
    },

    // Enable / Disable withdraw
    withdrawEnabled: {
        type: Boolean,
        default: true
    },

    // Rules shown in app
    rules: [{
        type: String
    }],

    // Payment Methods
    paymentMethods: {
        type: [paymentMethodSchema],
        default: []
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("WalletConfig", walletConfigSchema);