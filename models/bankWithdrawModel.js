const mongoose = require("mongoose");

const bankWithdrawSchema =
    new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        accountHolderName: {
            type: String,
            required: true
        },

        accountNumber: {
            type: String,
            required: true
        },

        ifscCode: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Rejected"
            ],
            default: "Pending"
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "BankWithdraw",
        bankWithdrawSchema
    );