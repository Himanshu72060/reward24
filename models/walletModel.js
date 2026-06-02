const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Enter coins"
    },
    hintText: {
        type: String,
        default: "UPI ID / Account Number"
    }
});

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
    rules: [{ type: String }],
    paymentMethods: [paymentMethodSchema]
}, { timestamps: true });

module.exports = mongoose.model("WalletConfig", walletConfigSchema);