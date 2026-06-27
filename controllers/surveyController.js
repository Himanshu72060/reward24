const Survey = require("../models/Survey");
const SurveyHistory = require("../models/SurveyHistory");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");

const uploadToBunny = require("../utils/bunnyUpload");


// ===========================================
// ADMIN - CREATE SURVEY
// ===========================================

exports.createSurvey = async (req, res) => {

    try {

        const {

            screenTitle,

            surveySections

        } = req.body;

        // ============================
        // PARSE JSON
        // ============================

        let partners = [];

        let parsedSurveySections = [];

        try {

            partners = req.body.partners
                ? JSON.parse(req.body.partners)
                : [];

            parsedSurveySections = req.body.surveySections
                ? JSON.parse(req.body.surveySections)
                : [];

        } catch (err) {

            return res.status(400).json({

                success: false,

                message: "Invalid JSON format"

            });

        }

        // ============================
        // IMAGE REQUIRED
        // ============================

        if (!req.files || req.files.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Partner images are required"

            });

        }

        // ============================
        // BUNNY UPLOAD
        // ============================

        if (req.files.length !== partners.length) {

            return res.status(400).json({

                success: false,

                message: "Partners count and images count must match"

            });

        }

        for (let i = 0; i < partners.length; i++) {

            const imageUrl = await uploadToBunny(

                req.files[i].buffer,

                Date.now() + "-" + req.files[i].originalname,

                "surveys"

            );

            partners[i].imgUrl = imageUrl;

        }

        // ============================
        // CREATE SURVEY
        // ============================

        const survey = await Survey.create({

            screenTitle,

            partners,

            surveySections: parsedSurveySections,

            totalCompleted: 0,

            isActive: true

        });

        return res.status(201).json({

            success: true,

            message: "Survey Created Successfully",

            data: survey

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// ADMIN - GET ALL SURVEYS
// ===========================================

exports.getSurveys = async (req, res) => {

    try {

        const surveys = await Survey.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: surveys.length,

            data: surveys

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// ADMIN - GET SINGLE SURVEY
// ===========================================

exports.getSingleSurvey = async (req, res) => {

    try {

        const survey = await Survey.findById(

            req.params.id

        );

        if (!survey) {

            return res.status(404).json({

                success: false,

                message: "Survey not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: survey

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================
// ADMIN - UPDATE SURVEY
// ===========================================

exports.updateSurvey = async (req, res) => {

    try {

        const survey = await Survey.findById(req.params.id);

        if (!survey) {

            return res.status(404).json({

                success: false,

                message: "Survey not found"

            });

        }

        let partners = survey.partners;
        let surveySections = survey.surveySections;

        // ==========================
        // PARSE JSON
        // ==========================

        if (req.body.partners) {

            partners = JSON.parse(req.body.partners);

        }

        if (req.body.surveySections) {

            surveySections = JSON.parse(req.body.surveySections);

        }

        // ==========================
        // NEW IMAGES
        // ==========================

        if (req.files && req.files.length > 0) {

            if (req.files.length !== partners.length) {

                return res.status(400).json({

                    success: false,

                    message: "Partners count and images count must match"

                });

            }

            for (let i = 0; i < partners.length; i++) {

                const imageUrl = await uploadToBunny(

                    req.files[i].buffer,

                    Date.now() + "-" + req.files[i].originalname,

                    "surveys"

                );

                partners[i].imgUrl = imageUrl;

            }

        }

        survey.screenTitle =
            req.body.screenTitle || survey.screenTitle;

        survey.partners = partners;

        survey.surveySections = surveySections;

        if (req.body.isActive !== undefined) {

            survey.isActive = req.body.isActive;

        }

        await survey.save();

        return res.status(200).json({

            success: true,

            message: "Survey Updated Successfully",

            data: survey

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// ADMIN - DELETE SURVEY
// ===========================================

exports.deleteSurvey = async (req, res) => {

    try {

        const survey = await Survey.findById(req.params.id);

        if (!survey) {

            return res.status(404).json({

                success: false,

                message: "Survey not found"

            });

        }

        await survey.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Survey Deleted Successfully"

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// USER - GET ACTIVE SURVEYS
// ===========================================

exports.getUserSurveys = async (req, res) => {

    try {

        const surveys = await Survey.find({

            isActive: true

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: surveys.length,

            data: surveys

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================
// USER - COMPLETE SURVEY
// ===========================================

exports.completeSurvey = async (req, res) => {

    try {

        const {

            provider,

            rewardCoins

        } = req.body;

        if (!provider || !rewardCoins) {

            return res.status(400).json({

                success: false,

                message: "Provider and rewardCoins are required"

            });

        }

        const survey = await Survey.findById(req.params.id);

        if (!survey) {

            return res.status(404).json({

                success: false,

                message: "Survey not found"

            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        // =============================
        // DUPLICATE CHECK
        // =============================

        const alreadyCompleted = await SurveyHistory.findOne({

            userId: user._id,

            surveyId: survey._id,

            provider

        });

        if (alreadyCompleted) {

            return res.status(400).json({

                success: false,

                message: "Survey reward already claimed"

            });

        }

        // =============================
        // UPDATE USER WALLET
        // =============================

        user.coins += Number(rewardCoins);

        user.totalEarnedCoins += Number(rewardCoins);

        await user.save();

        // =============================
        // SAVE HISTORY
        // =============================

        const history = await SurveyHistory.create({

            userId: user._id,

            surveyId: survey._id,

            provider,

            rewardCoins,

            status: "completed"

        });

        // =============================
        // COIN TRANSACTION
        // =============================

        await CoinTransaction.create({

            userId: user._id,

            coins: rewardCoins,

            type: "survey",

            status: "completed",

            description: `Survey Reward - ${provider}`

        });

        // =============================
        // UPDATE COUNT
        // =============================

        survey.totalCompleted += 1;

        await survey.save();

        return res.status(200).json({

            success: true,

            message: "Survey completed successfully",

            rewardCoins,

            totalCoins: user.coins,

            data: history

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// USER - MY SURVEY HISTORY
// ===========================================

exports.getMySurveyHistory = async (req, res) => {

    try {

        const history = await SurveyHistory.find({

            userId: req.user.id

        })

            .populate(

                "surveyId",

                "screenTitle partners"

            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: history.length,

            data: history

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};