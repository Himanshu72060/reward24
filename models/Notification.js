const mongoose =
    require("mongoose");

const notificationSchema =
    new mongoose.Schema(

        {

            title: {
                type: String,
                required: true
            },

            body: {
                type: String,
                required: true
            },

            time: {
                type: String,
                default: "Just now"
            },

            type: {
                type: String,
                enum: [
                    "reward",
                    "alert",
                    "store",
                    "default"
                ],
                default: "default"
            }

        },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "Notification",
        notificationSchema
    );