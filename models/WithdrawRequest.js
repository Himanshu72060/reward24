const mongoose = require("mongoose");

const withdrawRequestSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoinTransaction",
        required: true
    },
    coins: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["UPI", "BANK", "CARD", "WALLET"],
        required: true
    },

    paymentDetails: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    adminRemark: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "WithdrawRequest",
    withdrawRequestSchema
);