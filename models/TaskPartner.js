// const mongoose =
//     require("mongoose");

// const taskPartnerSchema =
//     new mongoose.Schema({

//         name: {
//             type: String,
//             required: true
//         },

//         color: {
//             type: String,
//             required: true
//         },

//         bonus: {
//             type: String,
//             default: ""
//         }

//     },
//         {
//             timestamps: true
//         });

// module.exports =
//     mongoose.model(
//         "TaskPartner",
//         taskPartnerSchema
//     );

const mongoose = require("mongoose");

const taskPartnerSchema = new mongoose.Schema(

    {

        // Partner Name
        name: {
            type: String,
            required: true,
            trim: true
        },

        // Partner Logo (Bunny CDN URL)
        logo: {
            type: String,
            default: ""
        },

        // Official Website
        website: {
            type: String,
            default: ""
        },

        // Play Store Package Name
        packageName: {
            type: String,
            default: ""
        },

        // Card Color
        color: {
            type: String,
            default: "#ffffff"
        },

        // Bonus Text
        bonus: {
            type: String,
            default: ""
        },

        // Short Description
        description: {
            type: String,
            default: ""
        },

        // Total Tasks
        totalTasks: {
            type: Number,
            default: 0
        },

        // Active / Inactive
        isActive: {
            type: Boolean,
            default: true
        }

    },

    {

        timestamps: true

    }

);

module.exports =
    mongoose.model(
        "TaskPartner",
        taskPartnerSchema
    );