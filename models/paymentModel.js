const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);