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
        const configs = await AdConfig.find();

        res.json({
            status: true,
            count: configs.length,
            data: configs
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