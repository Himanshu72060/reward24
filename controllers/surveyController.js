const Survey = require("../models/Survey");

exports.createSurvey = async (req, res) => {
    try {
        const survey = await Survey.create(req.body);

        res.status(201).json({
            success: true,
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();

        res.status(200).json({
            success: true,
            data: surveys
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getSingleSurvey = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateSurvey = async (req, res) => {
    try {
        const survey = await Survey.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: survey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteSurvey = async (req, res) => {
    try {
        await Survey.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Survey Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};