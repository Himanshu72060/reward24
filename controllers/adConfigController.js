const AdConfig = require("../models/adConfigModel");

// ================= CREATE CONFIG (ADMIN) =================

exports.createAdConfig = async (req, res) => {

    try {

        const existing = await AdConfig.findOne();

        if (existing) {

            return res.status(400).json({
                success: false,
                message: "Ad configuration already exists"
            });

        }

        const config = await AdConfig.create(req.body);

        return res.status(201).json({

            success: true,

            message: "Ad configuration created successfully",

            data: config

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= GET CONFIG (USER) =================

exports.getAdConfig = async (req, res) => {

    try {

        const config = await AdConfig.findOne({

            isActive: true

        });

        if (!config) {

            return res.status(404).json({

                success: false,

                message: "Ad configuration not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: config

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= UPDATE CONFIG (ADMIN) =================

exports.updateAdConfig = async (req, res) => {

    try {

        const config = await AdConfig.findOneAndUpdate(

            { isActive: true },

            req.body,

            {

                new: true

            }

        );

        if (!config) {

            return res.status(404).json({

                success: false,

                message: "Ad configuration not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Ad configuration updated successfully",

            data: config

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= DELETE CONFIG (ADMIN) =================

exports.deleteAdConfig = async (req, res) => {

    try {

        const config = await AdConfig.findByIdAndDelete(

            req.params.id

        );

        if (!config) {

            return res.status(404).json({

                success: false,

                message: "Ad configuration not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Ad configuration deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};