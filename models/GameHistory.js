const mongoose = require("mongoose");

const gameHistorySchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    gameId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Game",

        required: true

    },

    stepId: {

        type: String,

        required: true

    },

    rewardCoins: {

        type: Number,

        required: true

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

// Prevent duplicate reward for same step

gameHistorySchema.index(

    {

        userId: 1,

        gameId: 1,

        stepId: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(
    "GameHistory",
    gameHistorySchema
);