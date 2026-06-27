const mongoose = require("mongoose");

const challengeHistorySchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    challengeId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Challenge",

        required: true

    },

    rewardCoins: {

        type: Number,

        default: 0

    },

    status: {

        type: String,

        enum: [
            "joined",
            "completed"
        ],

        default: "completed"

    }

}, {
    timestamps: true
});

// One user can complete one challenge only once
challengeHistorySchema.index(

    {

        userId: 1,

        challengeId: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(
    "ChallengeHistory",
    challengeHistorySchema
);