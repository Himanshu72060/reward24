const SpinConfig = require("../models/SpinConfig");
const User = require("../models/User");

exports.getSpinConfig = async (req, res) => {

    try {

        const config =
            await SpinConfig.findOne();

        res.json({
            success: true,
            data: config
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.spinWheel = async (req, res) => {

    try {

        const config =
            await SpinConfig.findOne();

        const user =
            await User.findById(req.user.id);

        if (config.remainingSpins <= 0) {

            return res.status(400).json({
                message: "No spins left"
            });
        }

        const randomIndex =
            Math.floor(
                Math.random() *
                config.wheelItems.length
            );

        const reward =
            config.wheelItems[randomIndex];

        user.coins += reward.coins;

        await user.save();

        config.remainingSpins -= 1;

        await config.save();

        res.json({
            success: true,
            reward,
            totalCoins: user.coins,
            remainingSpins:
                config.remainingSpins
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};