const Challenge = require("../models/Challenge");
const ChallengeHistory = require("../models/ChallengeHistory");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");


// =======================================
// ADMIN - CREATE CHALLENGE
// =======================================

exports.createChallenge = async (req, res) => {

    try {

        const {

            banner,
            title,
            description,
            duration,
            rewardCoins,
            isLocked,
            secondsLeft,
            link

        } = req.body;

        if (
            !banner ||
            !banner.title ||
            !banner.coinsText ||
            !title ||
            !description ||
            !duration ||
            !rewardCoins ||
            !link
        ) {

            return res.status(400).json({

                success: false,
                message: "All fields are required"

            });

        }

        const challenge = await Challenge.create({

            banner,

            title,

            description,

            duration,

            rewardCoins,

            isLocked: isLocked || false,

            secondsLeft: secondsLeft || 0,

            link,

            totalJoined: 0,

            isActive: true

        });

        return res.status(201).json({

            success: true,

            message: "Challenge Created Successfully",

            data: challenge

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// ADMIN - GET ALL CHALLENGES
// =======================================

exports.getChallenges = async (req, res) => {

    try {

        const challenges = await Challenge.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: challenges.length,

            data: challenges

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// ADMIN - GET SINGLE CHALLENGE
// =======================================

exports.getSingleChallenge = async (req, res) => {

    try {

        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {

            return res.status(404).json({

                success: false,

                message: "Challenge Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            data: challenge

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// ADMIN - UPDATE CHALLENGE
// =======================================

exports.updateChallenge = async (req, res) => {

    try {

        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {

            return res.status(404).json({

                success: false,
                message: "Challenge Not Found"

            });

        }

        challenge.banner = req.body.banner || challenge.banner;

        challenge.title = req.body.title || challenge.title;

        challenge.description =
            req.body.description || challenge.description;

        challenge.duration =
            req.body.duration || challenge.duration;

        challenge.rewardCoins =
            req.body.rewardCoins ?? challenge.rewardCoins;

        challenge.isLocked =
            req.body.isLocked ?? challenge.isLocked;

        challenge.secondsLeft =
            req.body.secondsLeft ?? challenge.secondsLeft;

        challenge.link =
            req.body.link || challenge.link;

        challenge.isActive =
            req.body.isActive ?? challenge.isActive;

        await challenge.save();

        return res.status(200).json({

            success: true,

            message: "Challenge Updated Successfully",

            data: challenge

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// ADMIN - DELETE CHALLENGE
// =======================================

exports.deleteChallenge = async (req, res) => {

    try {

        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {

            return res.status(404).json({

                success: false,

                message: "Challenge Not Found"

            });

        }

        await challenge.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Challenge Deleted Successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// USER - GET ACTIVE CHALLENGES
// =======================================

exports.getUserChallenges = async (req, res) => {

    try {

        const challenges = await Challenge.find({

            isActive: true

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: challenges.length,

            data: challenges

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// USER - COMPLETE CHALLENGE
// =======================================

exports.completeChallenge = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {

            return res.status(404).json({

                success: false,

                message: "Challenge not found"

            });

        }

        if (!challenge.isActive) {

            return res.status(400).json({

                success: false,

                message: "Challenge is inactive"

            });

        }

        // Already Completed

        const alreadyCompleted = await ChallengeHistory.findOne({

            userId: user._id,

            challengeId: challenge._id

        });

        if (alreadyCompleted) {

            return res.status(400).json({

                success: false,

                message: "Challenge already completed"

            });

        }

        // =============================
        // UPDATE USER WALLET
        // =============================

        user.coins += challenge.rewardCoins;

        user.totalEarnedCoins += challenge.rewardCoins;

        await user.save();

        // =============================
        // SAVE HISTORY
        // =============================

        const history = await ChallengeHistory.create({

            userId: user._id,

            challengeId: challenge._id,

            rewardCoins: challenge.rewardCoins,

            status: "completed"

        });

        // =============================
        // COIN TRANSACTION
        // =============================

        await CoinTransaction.create({

            userId: user._id,

            coins: challenge.rewardCoins,

            type: "bonus",

            status: "completed",

            description: `Challenge Reward - ${challenge.title}`

        });

        // =============================
        // TOTAL JOINED
        // =============================

        challenge.totalJoined += 1;

        await challenge.save();

        return res.status(200).json({

            success: true,

            message: "Challenge completed successfully",

            rewardCoins: challenge.rewardCoins,

            totalCoins: user.coins,

            data: history

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// USER - MY CHALLENGE HISTORY
// =======================================

exports.getMyChallengeHistory = async (req, res) => {

    try {

        const history = await ChallengeHistory.find({

            userId: req.user.id

        })

            .populate(

                "challengeId",

                "title description rewardCoins duration"

            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: history.length,

            data: history

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};