const mongoose = require("mongoose");


const userStreakSchema =
    new mongoose.Schema({


        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        streakId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DailyStreak"
        },


        day: {
            type: Number
        },


        coins: {
            type: Number
        }


    }, {
        timestamps: true
    });


module.exports =
    mongoose.model(
        "UserStreakHistory",
        userStreakSchema
    );