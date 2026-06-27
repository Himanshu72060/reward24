const mongoose = require("mongoose");

const reelHistorySchema = new mongoose.Schema({

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

    rewardCoins: {

        type: Number,

        required: true

    },

    watchedSeconds: {

        type: Number,

        default: 0

    },

    status: {

        type: String,

        enum: [

            "completed"

        ],

        default: "completed"

    }

}, {

    timestamps: true

});

// One reward per reel per user

reelHistorySchema.index(

    {

        userId: 1,

        reelId: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(

    "ReelHistory",

    reelHistorySchema

);