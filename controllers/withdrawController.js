const WithdrawRequest = require("../models/WithdrawRequest");
const WalletConfig = require("../models/walletModel");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");
const ReferralHistory = require("../models/ReferralHistory");
// ==============================
// CREATE WITHDRAW REQUEST
// ==============================

exports.createWithdrawRequest = async (req, res) => {

    try {

        const {
            coins,
            paymentMethod,
            paymentDetails
        } = req.body;

        if (!coins || !paymentMethod || !paymentDetails) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        // const wallet = await WalletConfig.findOne();

        // const user = await User.findById(req.user.id);

        // if (!user) {

        //     return res.status(404).json({
        //         success: false,
        //         message: "User not found"
        //     });

        // }

        // if (coins < wallet.minWithdrawCoins) {

        //     return res.status(400).json({
        //         success: false,
        //         message: `Minimum ${wallet.minWithdrawCoins} coins required`
        //     });

        // }

        const wallet = await WalletConfig.findOne();

        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: "Wallet configuration not found"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (coins < wallet.minWithdrawCoins) {
            return res.status(400).json({
                success: false,
                message: `Minimum ${wallet.minWithdrawCoins} coins required`
            });
        }

        if (user.coins < coins) {

            return res.status(400).json({
                success: false,
                message: "Insufficient coins"
            });

        }

        const amount = (coins / wallet.rateCoins) * wallet.rateRupees;

        // const request = await WithdrawRequest.create({

        //     userId: user._id,

        //     coins,

        //     amount,

        //     paymentMethod,

        //     paymentDetails

        // });

        // await CoinTransaction.create({

        //     userId: user._id,

        //     coins,

        //     type: "withdraw",

        //     status: "pending",

        //     description: "Withdraw Request"

        // });

        const transaction = await CoinTransaction.create({

            userId: user._id,

            coins,

            type: "withdraw",

            status: "pending",

            description: "Withdraw Request"

        });

        const request = await WithdrawRequest.create({

            userId: user._id,

            transactionId: transaction._id,

            coins,

            amount,

            paymentMethod,

            paymentDetails

        });
        res.status(201).json({

            success: true,

            message: "Withdraw request submitted successfully",

            data: request

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==============================
// USER WITHDRAW HISTORY
// ==============================

exports.getMyWithdrawHistory = async (req, res) => {

    try {

        const history = await WithdrawRequest.find({

            userId: req.user.id

        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            data: history

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================
// ADMIN - GET ALL WITHDRAW REQUESTS
// ==============================

exports.getAllWithdrawRequests = async (req, res) => {

    try {

        const requests = await WithdrawRequest.find()
            .populate("userId", "fullName email mobileNumber coins")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==============================
// ADMIN - GET SINGLE REQUEST
// ==============================

exports.getWithdrawById = async (req, res) => {

    try {

        const request = await WithdrawRequest.findById(req.params.id)
            .populate("userId", "fullName email mobileNumber coins");

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Withdraw request not found"
            });

        }

        res.json({
            success: true,
            data: request
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==============================
// ADMIN - APPROVE WITHDRAW
// ==============================

exports.approveWithdraw = async (req, res) => {

    try {

        const { adminRemark } = req.body;

        const request = await WithdrawRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Withdraw request not found"
            });

        }

        if (request.status !== "pending") {

            return res.status(400).json({
                success: false,
                message: "Already processed"
            });

        }

        const user = await User.findById(request.userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        if (user.coins < request.coins) {

            return res.status(400).json({
                success: false,
                message: "User has insufficient balance"
            });

        }

        // Deduct Coins
        user.coins -= request.coins;
        user.totalWithdrawnCoins += request.coins;

        await user.save();



        const level1User = user.referredBy
            ? await User.findById(user.referredBy)
            : null;

        if (level1User) {

            // 10% Commission
            const level1Commission = Math.floor(request.amount * 0.10);

            if (level1Commission > 0) {

                // Wallet Update
                level1User.coins += level1Commission;
                level1User.totalEarnedCoins += level1Commission;
                level1User.referralIncome += level1Commission;

                await level1User.save();

                // Coin Transaction
                await CoinTransaction.create({
                    userId: level1User._id,
                    coins: level1Commission,
                    type: "referral",
                    status: "completed",
                    description: `Level 1 referral commission from ${user.fullName} withdrawal`
                });

                // Referral History
                await ReferralHistory.create({
                    userWhoEarned: level1User._id,
                    fromUser: user._id,
                    withdrawId: request._id,
                    level: 1,
                    withdrawAmount: request.amount,
                    rewardCoins: level1Commission
                });

            }

        }

        // ======================================
        // LEVEL 2 REFERRAL (5%)
        // ======================================

        if (level1User && level1User.referredBy) {

            const level2User = await User.findById(level1User.referredBy);

            if (level2User) {

                const level2Commission = Math.floor(request.amount * 0.05);

                if (level2Commission > 0) {

                    level2User.coins += level2Commission;
                    level2User.totalEarnedCoins += level2Commission;
                    level2User.referralIncome += level2Commission;

                    await level2User.save();

                    await CoinTransaction.create({
                        userId: level2User._id,
                        coins: level2Commission,
                        type: "referral",
                        status: "completed",
                        description: `Level 2 referral commission from ${user.fullName} withdrawal`
                    });

                    await ReferralHistory.create({
                        userWhoEarned: level2User._id,
                        fromUser: user._id,
                        withdrawId: request._id,
                        level: 2,
                        withdrawAmount: request.amount,
                        rewardCoins: level2Commission
                    });

                }
            }
        }


        // if (user.referredBy) {

        //     const level1User = await User.findById(user.referredBy);

        //     if (level1User && level1User.referredBy) {

        //         const level2User = await User.findById(level1User.referredBy);

        //         if (level2User) {

        //             const level2Commission = Number(
        //                 (request.amount * 5) / 100
        //             );

        //             // Wallet Update
        //             level2User.coins += level2Commission;

        //             level2User.totalEarnedCoins += level2Commission;

        //             level2User.referralIncome += level2Commission;

        //             await level2User.save();





        // if (level1User && level1User.referredBy) {

        //     const level2User = await User.findById(level1User.referredBy);

        //     if (level2User) {

        //         // 5% Commission
        //         const level2Commission = Math.floor(request.amount * 0.05);

        //         if (level2Commission > 0) {

        //             // Wallet Update
        //             level2User.coins += level2Commission;
        //             level2User.totalEarnedCoins += level2Commission;
        //             level2User.referralIncome += level2Commission;

        //             await level2User.save();

        //             // Coin Transaction
        //             await CoinTransaction.create({

        //                 userId: level2User._id,

        //                 coins: level2Commission,

        //                 type: "referral",

        //                 status: "completed",

        //                 description: `Level 2 referral commission from ${user.fullName} withdrawal`

        //             });

        //             // Referral History
        //             await ReferralHistory.create({

        //                 userWhoEarned: level2User._id,

        //                 fromUser: user._id,

        //                 withdrawId: request._id,

        //                 level: 2,

        //                 withdrawAmount: request.amount,

        //                 rewardCoins: level2Commission

        //             });

        //         }

        //     }

        // }

        //         }

        //     }

        // }

        request.status = "approved";
        request.adminRemark = adminRemark || "";

        await request.save();



        await CoinTransaction.findByIdAndUpdate(
            request.transactionId,
            {
                status: "approved"
            }
        );

        res.json({
            success: true,
            message: "Withdraw Approved Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==============================
// ADMIN - REJECT WITHDRAW
// ==============================

exports.rejectWithdraw = async (req, res) => {

    try {

        const { adminRemark } = req.body;

        const request = await WithdrawRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Withdraw request not found"
            });

        }

        if (request.status !== "pending") {

            return res.status(400).json({
                success: false,
                message: "Already processed"
            });

        }

        request.status = "rejected";
        request.adminRemark = adminRemark || "";

        await request.save();

        // await CoinTransaction.findOneAndUpdate(
        //     {
        //         userId: request.userId,
        //         type: "withdraw",
        //         status: "pending",
        //         coins: request.coins
        //     },
        //     {
        //         status: "rejected"
        //     }
        // );
        await CoinTransaction.findByIdAndUpdate(
            request.transactionId,
            {
                status: "rejected"
            }
        );

        res.json({
            success: true,
            message: "Withdraw Rejected Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};