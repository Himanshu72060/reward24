const mongoose =
    require("mongoose");

const taskPartnerSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        color: {
            type: String,
            required: true
        },

        bonus: {
            type: String,
            default: ""
        }

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "TaskPartner",
        taskPartnerSchema
    );