const mongoose =
    require("mongoose");

const transactionSchema =
    new mongoose.Schema({

        coins: {
            type: String,
            required: true
        },

        source: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Pending"
        },

        txnId: {
            type: String,
            required: true,
            unique: true
        },

        date: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: [
                "Credited",
                "Pending",
                "Withdrawals",
                "Debited"
            ],
            default: "Credited"
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Transaction",
        transactionSchema
    );