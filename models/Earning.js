const mongoose =
    require("mongoose");

const earningSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },

            icon: {
                type: String,
                required: true
            },

            earned: {
                type: Number,
                required: true
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Earning",
        earningSchema
    );