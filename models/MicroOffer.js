const mongoose = require("mongoose");

// QUICK OFFERS

const quickOfferSchema =
    new mongoose.Schema({

        coins: String,

        time: String,

        color: String

    });

// CURATED ADS

const curatedAdSchema =
    new mongoose.Schema({

        title: String,

        duration: String,

        reward: String,

        link: String

    });

// PTC PARTNERS

const ptcPartnerSchema =
    new mongoose.Schema({

        name: String,

        sub: String,

        link: String,

        coins: String,

        stars: Number

    });

// TASK DETAILS

const taskDetailSchema =
    new mongoose.Schema({

        bannerText: String,

        bonusText: String,

        infoText: String,

        importantTips: [String],

        moreEarningTips: [String],

        noteText: String

    });

// MAIN MODEL

const microOfferSchema =
    new mongoose.Schema({

        screenTitle: {
            type: String,
            required: true
        },

        quickOffers: [
            quickOfferSchema
        ],

        curatedAds: [
            curatedAdSchema
        ],

        ptcPartners: [
            ptcPartnerSchema
        ],

        taskDetails: [
            taskDetailSchema
        ]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "MicroOffer",
        microOfferSchema
    );