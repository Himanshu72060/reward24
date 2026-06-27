const mongoose = require("mongoose");

const rewardAdSchema = new mongoose.Schema({
    platform: {
        type: String,
        enum: ["android"],
        required: true
    },
    ad_unit_id: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
});

const adConfigSchema = new mongoose.Schema(
    {
        app_id: {
            type: String,
            required: true,
            trim: true
        },

        rewarded_ads: [rewardAdSchema],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("AdConfig", adConfigSchema);