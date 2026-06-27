const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    // ===========================
    // BASIC DETAILS
    // ===========================

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    // ===========================
    // REFERRAL
    // ===========================

    // ===========================
    // REFERRAL
    // ===========================

    myReferralCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        immutable: true
    },

    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    totalReferrals: {
        type: Number,
        default: 0
    },

    referralIncome: {
        type: Number,
        default: 0
    },

    // ===========================
    // WALLET
    // ===========================

    coins: {
        type: Number,
        default: 50
    },

    totalEarnedCoins: {
        type: Number,
        default: 50
    },

    totalWithdrawnCoins: {
        type: Number,
        default: 0
    },

    // ===========================
    // ROLE
    // ===========================

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    // ===========================
    // PROFILE
    // ===========================

    profileImage: {
        type: String,
        default: ""
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    // ===========================
    // DAILY SPIN
    // ===========================

    dailySpinCount: {
        type: Number,
        default: 0
    },

    lastSpinDate: {
        type: Date,
        default: null
    },

    // ===========================
    // DAILY CHECK-IN
    // ===========================

    checkInStreak: {
        type: Number,
        default: 0
    },

    lastCheckInDate: {
        type: Date,
        default: null
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model("User", userSchema);