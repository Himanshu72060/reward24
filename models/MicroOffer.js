const mongoose = require("mongoose");

// ================= QUICK OFFER =================

const quickOfferSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    estimatedTime: {
        type: String,
        default: ""
    },

    color: {
        type: String,
        default: "#4CAF50"
    },

    link: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { _id: true });


// ================= CURATED ADS =================

const curatedAdSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        default: ""
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    link: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { _id: true });


// ================= PTC PARTNER =================

const ptcPartnerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    sub: {
        type: String,
        default: ""
    },

    rewardCoins: {
        type: Number,
        required: true
    },

    stars: {
        type: Number,
        default: 5
    },

    link: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { _id: true });


// ================= TASK DETAILS =================

const taskDetailSchema = new mongoose.Schema({

    bannerText: {
        type: String,
        default: ""
    },

    bonusText: {
        type: String,
        default: ""
    },

    infoText: {
        type: String,
        default: ""
    },

    importantTips: [{
        type: String
    }],

    moreEarningTips: [{
        type: String
    }],

    noteText: {
        type: String,
        default: ""
    }

}, { _id: true });


// ================= MAIN MODEL =================

const microOfferSchema = new mongoose.Schema({

    screenTitle: {

        type: String,

        required: true

    },

    quickOffers: [quickOfferSchema],

    curatedAds: [curatedAdSchema],

    ptcPartners: [ptcPartnerSchema],

    taskDetails: [taskDetailSchema],

    totalCompleted: {

        type: Number,

        default: 0

    },

    isActive: {

        type: Boolean,

        default: true

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(
    "MicroOffer",
    microOfferSchema
);