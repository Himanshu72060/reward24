const mongoose = require("mongoose");

const taskSubmissionSchema = new mongoose.Schema({

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    screenshot: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "reject"
        ],
        default: "pending"
    },

    adminRemark: {
        type: String,
        default: ""
    },

    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    approvedAt: {
        type: Date,
        default: null
    },

    rewardGiven: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "TaskSubmission",
    taskSubmissionSchema
);