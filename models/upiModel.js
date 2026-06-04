const mongoose =
    require("mongoose");

const upiSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        minAmount: {
            type: Number,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Upi",
        upiSchema
    );