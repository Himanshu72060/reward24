const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        subtitle: {
            type: String,
            required: true
        },

        coins: {
            type: Number,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        playStoreUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);