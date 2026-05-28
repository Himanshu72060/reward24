const mongoose =
    require("mongoose");

// BRAND VOUCHER

const brandVoucherSchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        minAmount: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        }

    });

// STORE CATEGORY

const storeCategorySchema =
    new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        iconName: {
            type: String,
            required: true
        },

        brands: [
            brandVoucherSchema
        ]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "StoreCategory",
        storeCategorySchema
    );