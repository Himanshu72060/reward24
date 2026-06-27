// const User = require("../models/User");
// const Spin = require("../models/spinModel");

// const UserProfile =
//     require("../models/UserProfile");

// /* =========================
//    🎰 SPIN WHEEL (POST)
// ========================= */

// exports.spinWheel = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // DAILY SPIN CHECK
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const alreadySpin = await Spin.findOne({
//             user: user._id,
//             createdAt: { $gte: today },
//         });

//         if (alreadySpin) {
//             return res.status(400).json({
//                 success: false,
//                 message: "You already used today's spin",
//             });
//         }

//         // RANDOM REWARD
//         const rewards = [5, 10, 20, 50, 100];

//         const reward =
//             rewards[Math.floor(Math.random() * rewards.length)];

//         // UPDATE USER COINS
//         user.coins += reward;
//         await user.save();

//         await UserProfile.findOneAndUpdate(
//             {
//                 userId: user._id
//             },
//             {
//                 $set: {
//                     totalCoins: user.coins
//                 }
//             }
//         );



//         // SAVE HISTORY
//         await Spin.create({
//             user: user._id,
//             coinsWon: reward,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Spin successful",
//             reward,
//             totalCoins: user.coins,
//         });

//     } catch (error) {
//         console.log("SPIN ERROR:", error);

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };


// /* =========================
//    📊 GET SPIN HISTORY
// ========================= */

// exports.getSpinHistory = async (req, res) => {
//     try {
//         const spins = await Spin.find({
//             user: req.user.id,
//         }).sort({ createdAt: -1 });

//         return res.status(200).json({
//             success: true,
//             count: spins.length,
//             spins,
//         });

//     } catch (error) {
//         console.log("SPIN HISTORY ERROR:", error);

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

const User = require("../models/User");
const Spin = require("../models/spinModel");
const UserProfile = require("../models/UserProfile");
const CoinTransaction = require("../models/CoinTransaction");

// =========================
// 🎰 SPIN WHEEL
// =========================

exports.spinWheel = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // DAILY SPIN CHECK

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const alreadySpin = await Spin.findOne({
            user: user._id,
            createdAt: { $gte: today }
        });

        if (alreadySpin) {
            return res.status(400).json({
                success: false,
                message: "You already used today's spin"
            });
        }

        // RANDOM REWARD

        const rewards = [5, 10, 20, 50, 100];

        const reward =
            rewards[Math.floor(Math.random() * rewards.length)];

        // USER COINS UPDATE

        user.coins = (user.coins || 0) + reward;

        user.totalEarnedCoins =
            (user.totalEarnedCoins || 0) + reward;

        await user.save();

        // USER PROFILE UPDATE (IF EXISTS)

        await UserProfile.findOneAndUpdate(
            { userId: user._id },
            {
                $set: {
                    totalCoins: user.coins
                }
            },
            {
                new: true
            }
        );

        // SAVE SPIN HISTORY

        await Spin.create({
            user: user._id,
            coinsWon: reward
        });

        // SAVE COIN TRANSACTION

        // await CoinTransaction.create({
        //     userId: user._id,
        //     coins: reward,
        //     type: "bonus",
        //     description: "Daily Spin Reward"
        // });

        // SAVE COIN TRANSACTION

        await CoinTransaction.create({

            userId: user._id,

            coins: reward,

            type: "spin",

            status: "completed",

            description: "Daily Spin Reward"

        });

        return res.status(200).json({
            success: true,
            message: "Spin successful",
            reward,
            totalCoins: user.coins
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// 📊 SPIN HISTORY
// =========================

exports.getSpinHistory = async (req, res) => {

    try {

        const spins = await Spin.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: spins.length,
            spins
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};