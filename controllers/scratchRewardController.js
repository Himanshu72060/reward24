const ScratchReward = require("../models/ScratchReward");
const ScratchHistory = require("../models/ScratchHistory");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");
exports.createScratchReward = async (req, res) => {

    try {

        const reward = await ScratchReward.create({

            title: req.body.title,

            description: req.body.description,

            rewardCoins: req.body.rewardCoins,

            image: req.body.image,

            isActive: req.body.isActive ?? true

        });

        return res.status(201).json({

            success: true,

            message: "Scratch Reward Created",

            data: reward

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getScratchRewards = async (req, res) => {

    try {

        const rewards = await ScratchReward.find()

            .sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,

            count: rewards.length,

            data: rewards

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getSingleScratchReward = async (req, res) => {

    try {

        const reward = await ScratchReward.findById(req.params.id);

        if (!reward) {

            return res.status(404).json({

                success: false,

                message: "Scratch Reward Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            data: reward

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.updateScratchReward = async (req, res) => {

    try {

        const reward = await ScratchReward.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        if (!reward) {

            return res.status(404).json({

                success: false,

                message: "Scratch Reward Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Scratch Reward Updated",

            data: reward

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.deleteScratchReward = async (req, res) => {

    try {

        const reward = await ScratchReward.findById(req.params.id);

        if (!reward) {

            return res.status(404).json({

                success: false,

                message: "Scratch Reward Not Found"

            });

        }

        await reward.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Scratch Reward Deleted"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getUserScratchRewards = async (req, res) => {

    try {

        const rewards = await ScratchReward.find({

            isActive: true

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: rewards.length,

            data: rewards

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// =======================================
// USER CLAIM SCRATCH REWARD
// =======================================

exports.claimScratchReward = async (req, res) => {

    try {

        const userId = req.user.id;
        const rewardId = req.params.id;

        // Check User
        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Check Reward
        const reward = await ScratchReward.findById(rewardId);

        if (!reward || !reward.isActive) {

            return res.status(404).json({
                success: false,
                message: "Scratch reward not found"
            });

        }

        // Already Claimed Check
        const alreadyClaimed = await ScratchHistory.findOne({

            userId,
            scratchRewardId: rewardId

        });

        if (alreadyClaimed) {

            return res.status(400).json({

                success: false,
                message: "Scratch reward already claimed"

            });

        }

        // ==========================
        // UPDATE USER WALLET
        // ==========================

        user.coins += reward.rewardCoins;

        user.totalEarnedCoins += reward.rewardCoins;

        await user.save();

        // ==========================
        // CREATE COIN TRANSACTION
        // ==========================

        await CoinTransaction.create({

            userId,

            coins: reward.rewardCoins,

            type: "bonus",

            status: "completed",

            description: `Scratch Reward : ${reward.title}`

        });

        // ==========================
        // SAVE HISTORY
        // ==========================

        const history = await ScratchHistory.create({

            userId,

            scratchRewardId: reward._id,

            rewardCoins: reward.rewardCoins

        });

        // ==========================
        // UPDATE TOTAL CLAIMS
        // ==========================

        reward.totalClaims += 1;

        await reward.save();

        return res.status(200).json({

            success: true,

            message: "Scratch reward claimed successfully",

            rewardCoins: reward.rewardCoins,

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
// USER SCRATCH HISTORY
// =======================================

exports.getMyScratchHistory = async (req, res) => {

    try {

        const history = await ScratchHistory.find({

            userId: req.user.id

        })

            .populate(

                "scratchRewardId",

                "title rewardCoins image"

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