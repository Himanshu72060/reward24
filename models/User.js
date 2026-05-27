const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },



    // USER OWN REFERRAL CODE
    myReferralCode: {
        type: String,
        unique: true
    },



    // USED REFERRAL CODE
    referredBy: {
        type: String,
        default: ""
    },



    // USER COINS
    coins: {
        type: Number,
        default: 50
    },



    // TOTAL REFERRALS
    totalReferrals: {
        type: Number,
        default: 0
    }

},
    {
        timestamps: true
    });

module.exports =
    mongoose.model("User", userSchema);