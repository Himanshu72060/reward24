const User =
    require("../models/User");

const DailyStreak =
    require("../models/dailyStreakModel");

exports.claimDailyStreak =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const today =
                new Date();

            today.setHours(
                0, 0, 0, 0
            );

            const alreadyClaimed =
                await DailyStreak.findOne({

                    userId: user._id,

                    createdAt: {
                        $gte: today
                    }

                });

            if (alreadyClaimed) {

                return res.status(400).json({
                    success: false,
                    message: "Daily streak already claimed"
                });

            }

            const rewards =
                [10, 20, 30, 40, 50];

            const reward =
                rewards[
                Math.floor(
                    Math.random() *
                    rewards.length
                )
                ];

            user.coins += reward;

            await user.save();

            const streak =
                await DailyStreak.create({

                    userId: user._id,

                    rewardCoins: reward

                });

            return res.status(200).json({

                success: true,

                message:
                    "Daily streak claimed",

                reward,

                totalCoins:
                    user.coins,

                data: streak

            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };



exports.getDailyStreakHistory =
    async (req, res) => {

        try {

            const history =
                await DailyStreak.find({

                    userId:
                        req.user.id

                }).sort({
                    createdAt: -1
                });

            return res.status(200).json({

                success: true,

                count:
                    history.length,

                data:
                    history

            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };