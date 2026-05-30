const mongoose =
    require("mongoose");

const badgeSchema =
    new mongoose.Schema({

        title: String,

        iconKey: String

    });

const tipSchema =
    new mongoose.Schema({

        title: String,

        description: String,

        highlightColorHex: String

    });

const partnerDetailSchema =
    new mongoose.Schema({

        partnerId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "TaskPartner",

            required: true

        },

        partnerName: {

            type: String,

            required: true

        },

        targetUrl: {

            type: String,

            required: true

        },

        bannerTitle: {

            type: String,

            required: true

        },

        badges: [
            badgeSchema
        ],

        tips: [
            tipSchema
        ]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "PartnerDetail",
        partnerDetailSchema
    );