// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true
//         },

//         subtitle: {
//             type: String,
//             required: true
//         },

//         coins: {
//             type: Number,
//             required: true
//         },

//         imageUrl: {
//             type: String,
//             required: true
//         },

//         playStoreUrl: {
//             type: String,
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        subtitle: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        imageUrl: {
            type: String,
            required: true
        },

        playStoreUrl: {
            type: String,
            required: true
        },

        coins: {
            type: Number,
            required: true,
            min: 1
        },

        category: {
            type: String,
            default: "General"
        },

        taskType: {
            type: String,
            enum: [
                "install",
                "signup",
                "survey",
                "offer",
                "game",
                "other"
            ],
            default: "install"
        },

        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskPartner",
            default: null
        },

        totalCompleted: {
            type: Number,
            default: 0
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);