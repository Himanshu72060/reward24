const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        },

        icon: {
            type: String,
            required: true
        },

        color: {
            type: String,
            required: true
        },

        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Category", categorySchema);