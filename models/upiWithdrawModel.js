const mongoose = require("mongoose");

const upiWithdrawSchema =
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

        upiId: {
            type: String,
            required: true
        },

        confirmUpiId: {
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
        "UpiWithdraw",
        upiWithdrawSchema
    );