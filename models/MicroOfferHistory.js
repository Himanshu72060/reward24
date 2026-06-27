const mongoose = require("mongoose");

const microOfferHistorySchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    microOfferId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "MicroOffer",

        required: true

    },

    // Which section user completed
    section: {

        type: String,

        enum: [
            "quickOffer",
            "curatedAd",
            "ptcPartner"
        ],

        required: true

    },

    // Index of item inside array
    offerIndex: {

        type: Number,

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

// Prevent duplicate claim
microOfferHistorySchema.index(

    {

        userId: 1,

        microOfferId: 1,

        section: 1,

        offerIndex: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(

    "MicroOfferHistory",

    microOfferHistorySchema

);