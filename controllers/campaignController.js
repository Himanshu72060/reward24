const Campaign = require("../models/Campaign");

exports.createCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);

        res.status(201).json({
            success: true,
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();

        res.status(200).json({
            success: true,
            data: campaigns
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message  
        });
    }
};

exports.getSingleCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: campaign
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        await Campaign.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Campaign Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};