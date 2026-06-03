const crypto =
    require("crypto");

const User =
    require("../models/User");

const Redeem =
    require("../models/Redeem");


exports.redeemVoucher =
    async (
        req,
        res
    ) => {

        try {


            const {
                voucherId,
                voucherName,
                voucherValue,
                coinsCost
            } = req.body;

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

            if (
                user.coins <
                coinsCost
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient Coins"
                });
            }

            user.coins =
                user.coins -
                coinsCost;

            await user.save();

            const redeemCode =
                crypto
                    .randomBytes(12)
                    .toString("hex");

            const redeem =
                await Redeem.create({

                    userId:
                        user._id,

                    voucherId,

                    voucherName,

                    voucherValue,

                    coinsUsed:
                        coinsCost,

                    redeemCode

                });


            return res.status(200).json({

                success: true,

                message:
                    "Redeem Successful",

                data: {
                    redeemId:
                        redeem._id,

                    redeemCode,

                    remainingCoins:
                        user.coins
                }

            });

        } catch (error) {


            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };



exports.getMyRedeems =
    async (
        req,
        res
    ) => {

        try {


            const redeems =
                await Redeem.find({
                    userId: req.user.id
                });


            const allRedeems =
                await Redeem.find({});


            return res.status(200).json({
                success: true,
                data: redeems
            });

        } catch (error) {


            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };