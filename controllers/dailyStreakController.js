const User = require("../models/User");
const DailyStreak = require("../models/dailyStreak");
const DailyStreakConfig = require("../models/DailyStreakConfig");
const CoinTransaction = require("../models/CoinTransaction");

// =====================================
// USER CLAIM DAILY STREAK
// =====================================

exports.claimDailyStreak = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Last Claimed Day
        const lastClaim = await DailyStreak
            .findOne({
                userId: user._id
            })
            .sort({ createdAt: -1 });

        let day = 1;

        if (lastClaim) {

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const lastDate = new Date(lastClaim.createdAt);
            lastDate.setHours(0, 0, 0, 0);

            const diff = Math.floor(
                (today - lastDate) /
                (1000 * 60 * 60 * 24)
            );

            // Already claimed today
            if (diff === 0) {

                return res.status(400).json({
                    success: false,
                    message: "Today's reward already claimed"
                });

            }

            // Continue streak
            if (diff === 1) {

                day = lastClaim.day + 1;

                if (day > 7) {
                    day = 1;
                }

            }
            // Missed one day
            else {

                day = 1;

            }

        }

        // Get Admin Config
        const config = await DailyStreakConfig.findOne({

            day,

            isActive: true

        });

        if (!config) {

            return res.status(404).json({

                success: false,

                message: `Day ${day} configuration not found`

            });

        }

        // Wallet Update
        user.coins += config.rewardCoins;
        user.totalEarnedCoins += config.rewardCoins;

        await user.save();

        // History
        const history = await DailyStreak.create({

            userId: user._id,

            day,

            rewardCoins: config.rewardCoins

        });

        // Wallet Transaction
        await CoinTransaction.create({

            userId: user._id,

            coins: config.rewardCoins,

            type: "daily_checkin",

            status: "completed",

            description: `Daily Streak Day ${day}`

        });

        return res.status(200).json({

            success: true,

            message: "Daily streak claimed successfully",

            day,

            rewardCoins: config.rewardCoins,

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


// =====================================
// USER DAILY STREAK LIST
// =====================================

exports.getDailyStreaks = async (req, res) => {

    try {

        const configs = await DailyStreakConfig
            .find({
                isActive: true
            })
            .sort({
                day: 1
            });

        const history = await DailyStreak.find({

            userId: req.user.id

        });

        const data = configs.map(item => {

            const claimed = history.find(
                h => h.day === item.day
            );

            return {

                day: item.day,

                rewardCoins: item.rewardCoins,

                title: item.title,

                description: item.description,

                claimed: !!claimed,

                claimedAt: claimed
                    ? claimed.claimedAt
                    : null

            };

        });

        return res.status(200).json({

            success: true,

            count: data.length,

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// USER CLAIM HISTORY
// =====================================

exports.getDailyStreakHistory = async (req, res) => {

    try {

        const history = await DailyStreak.find({

            userId: req.user.id

        }).sort({

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
// =====================================
// ADMIN CREATE DAILY STREAK
// =====================================

exports.createDailyStreak = async (req, res) => {

    try {

        const config = await DailyStreakConfig.create({

            day: req.body.day,

            rewardCoins: req.body.rewardCoins,

            title: req.body.title,

            description: req.body.description,

            isActive: req.body.isActive ?? true

        });

        res.status(201).json({

            success: true,

            message: "Daily Streak Created Successfully",

            data: config

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// ADMIN GET ALL DAILY STREAKS
// =====================================

exports.getAllDailyStreakConfigs = async (req, res) => {

    try {

        const data = await DailyStreakConfig
            .find()
            .sort({ day: 1 });

        res.status(200).json({

            success: true,

            count: data.length,

            data

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// ADMIN UPDATE DAILY STREAK
// =====================================

exports.updateDailyStreak = async (req, res) => {

    try {

        const config = await DailyStreakConfig.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        if (!config) {

            return res.status(404).json({

                success: false,

                message: "Daily Streak Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Updated Successfully",

            data: config

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// ADMIN DELETE DAILY STREAK
// =====================================

exports.deleteDailyStreak = async (req, res) => {

    try {

        const config = await DailyStreakConfig.findByIdAndDelete(
            req.params.id
        );

        if (!config) {

            return res.status(404).json({

                success: false,

                message: "Daily Streak Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};