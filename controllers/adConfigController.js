const AdConfig = require("../models/adConfigModel");

/* ================= CREATE CONFIG ================= */
exports.createAdConfig = async (req, res) => {
    try {

        // Check existing config
        const existingConfig = await AdConfig.findOne();

        if (existingConfig) {
            return res.status(400).json({
                status: false,
                message: "Ad Configuration already exists. Delete the existing configuration before creating a new one."
            });
        }

        const config = await AdConfig.create(req.body);

        res.status(201).json({
            status: true,
            message: "Ad Configuration Created Successfully",
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

// DELETE CONFIG (IF NEEDED)
exports.deleteAdConfig = async (req, res) => {
    try {

        const config = await AdConfig.findByIdAndDelete(req.params.id);

        if (!config) {
            return res.status(404).json({
                status: false,
                message: "Ad Configuration not found"
            });
        }

        res.json({
            status: true,
            message: "Ad Configuration deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
};
