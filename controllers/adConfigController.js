const AdConfig = require("../models/adConfigModel");

/* ================= CREATE CONFIG ================= */
exports.createAdConfig = async (req, res) => {
    try {
        const config = await AdConfig.create(req.body);

        res.status(201).json({
            status: true,
            message: "Ad Configuration Created",
            data: config
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
};

/* ================= GET CONFIG (MAIN RESPONSE) ================= */
exports.getAdConfig = async (req, res) => {
    try {
        const config = await AdConfig.findOne({ isActive: true });

        if (!config) {
            return res.status(404).json({
                status: false,
                message: "No Ad Config Found"
            });
        }

        res.json({
            status: true,
            message: "Ad Configuration Loaded",
            data: {
                app_id: config.app_id,
                rewarded_ads: config.rewarded_ads.map((ad, index) => ({
                    id: index + 1,
                    platform: ad.platform,
                    ad_unit_id: ad.ad_unit_id,
                    status: ad.status
                }))
            }
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
};

/* ================= UPDATE CONFIG ================= */
exports.updateAdConfig = async (req, res) => {
    try {
        const config = await AdConfig.findOneAndUpdate(
            { isActive: true },
            req.body,
            { new: true }
        );

        res.json({
            status: true,
            message: "Ad Configuration Updated",
            data: config
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
};