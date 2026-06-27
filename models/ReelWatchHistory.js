const mongoose = require("mongoose");


const reelWatchHistorySchema = new mongoose.Schema(

    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        reelId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Reel",

            required: true

        },


        watchTime: {

            type: Number,

            default: 0

        },


        completed: {

            type: Boolean,

            default: false

        },


        watchedAt: {

            type: Date,

            default: Date.now

        }

    },

    {
        timestamps: true
    }

);



module.exports =
    mongoose.model(
        "ReelWatchHistory",
        reelWatchHistorySchema
    );