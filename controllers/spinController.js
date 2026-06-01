// # controllers / spinController.js

const User =
    require("../models/User");

const Spin =
    require("../models/spinModel");



/* =========================
   🎰 SPIN WHEEL
========================= */

exports.spinWheel =
    async (req, res) => {

        try {

            // FIND USER

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found",

                });

            }

            // =========================
            // DAILY SPIN CHECK
            // =========================

            const today =
                new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );

            const alreadySpin =
                await Spin.findOne({

                    user:
                        user._id,

                    createdAt: {
                        $gte: today,
                    },

                });

            if (alreadySpin) {

                return res.status(400).json({

                    success: false,

                    message:
                        "You already used today's spin",

                });

            }

            // =========================
            // RANDOM REWARD
            // =========================

            const rewards = [

                5,

                10,

                20,

                50,

                100,

            ];

            const reward =
                rewards[
                Math.floor(
                    Math.random() *
                    rewards.length
                )
                ];

            // =========================
            // UPDATE USER COINS
            // =========================

            user.coins += reward;

            await user.save();

            // =========================
            // SAVE SPIN HISTORY
            // =========================

            await Spin.create({

                user:
                    user._id,

                coinsWon:
                    reward,

            });

            // =========================
            // RESPONSE
            // =========================

            res.status(200).json({

                success: true,

                message:
                    "Spin successful",

                reward,

                totalCoins:
                    user.coins,

            });

        } catch (error) {

            console.log(
                "SPIN ERROR:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };

    // exports.getSpinHistory = async (req, res) => {

    //     try {
    //         const spins = await Spin.find({ user: req.user.id }).sort({ createdAt: -1 });
    //         res.status(200).json({
    //             success: true,
    //             spins
    //         });
    //     } catch (error) {
    //         console.log("SPIN HISTORY ERROR:", error);
    //         res.status(500).json({
    //             success: false,
    //             message: error.message
    //         });
    //     }
    // };

    // e
