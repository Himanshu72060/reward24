const mongoose = require("mongoose");

const wheelItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

const spinConfigSchema = new mongoose.Schema({
    wheelItems: [wheelItemSchema],

    remainingSpins: {
        type: Number,
        default: 5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(
    "SpinConfig",
    spinConfigSchema
);