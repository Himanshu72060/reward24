const mongoose = require("mongoose");

const taskHistorySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["completed"],
        default: "completed"
    }

}, {
    timestamps: true
});

taskHistorySchema.index(
    { userId: 1, taskId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "TaskHistory",
    taskHistorySchema
);