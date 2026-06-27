const GiftCard = require("../models/GiftCard");

const User = require("../models/User");

const CoinTransaction = require("../models/CoinTransaction");


// ================= CREATE GIFT CARD (ADMIN) =================

exports.createGiftCard = async (req, res) => {

    try {

        const {

            title,

            amount,

            requiredCoins,

            code,

            color

        } = req.body;

        const existing = await GiftCard.findOne({

            code

        });

        if (existing) {

            return res.status(400).json({

                success: false,

                message: "Gift Card Code already exists"

            });

        }

        const card = await GiftCard.create({

            title,

            amount,

            requiredCoins,

            code,

            color

        });

        return res.status(201).json({

            success: true,

            message: "Gift Card Created Successfully",

            data: card

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= GET ALL GIFT CARDS =================

exports.getGiftCards = async (req, res) => {

    try {

        const cards = await GiftCard.find({

            isActive: true,

            isRedeemed: false

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: cards.length,

            data: cards

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= GET SINGLE GIFT CARD =================

exports.getGiftCard = async (req, res) => {

    try {

        const card = await GiftCard.findById(

            req.params.id

        );

        if (!card) {

            return res.status(404).json({

                success: false,

                message: "Gift Card Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            data: card

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ================= UPDATE GIFT CARD =================

exports.updateGiftCard = async (req, res) => {

    try {

        const card = await GiftCard.findById(req.params.id);

        if (!card) {

            return res.status(404).json({

                success: false,

                message: "Gift Card Not Found"

            });

        }

        card.title = req.body.title || card.title;

        card.amount = req.body.amount || card.amount;

        card.requiredCoins = req.body.requiredCoins || card.requiredCoins;

        card.code = req.body.code || card.code;

        card.color = req.body.color || card.color;

        if (req.body.isActive !== undefined) {

            card.isActive = req.body.isActive;

        }

        await card.save();

        return res.status(200).json({

            success: true,

            message: "Gift Card Updated Successfully",

            data: card

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= DELETE GIFT CARD =================

exports.deleteGiftCard = async (req, res) => {

    try {

        const card = await GiftCard.findById(req.params.id);

        if (!card) {

            return res.status(404).json({

                success: false,

                message: "Gift Card Not Found"

            });

        }

        await GiftCard.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Gift Card Deleted Successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ================= USER REDEEM GIFT CARD =================

// ================= USER REDEEM GIFT CARD =================

exports.redeemGiftCard = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const card = await GiftCard.findById(req.params.id);

        if (!card) {

            return res.status(404).json({

                success: false,

                message: "Gift Card not found"

            });

        }

        if (!card.isActive) {

            return res.status(400).json({

                success: false,

                message: "Gift Card is inactive"

            });

        }

        if (card.isRedeemed) {

            return res.status(400).json({

                success: false,

                message: "Gift Card already redeemed"

            });

        }

        if (user.coins < card.requiredCoins) {

            return res.status(400).json({

                success: false,

                message: `You need ${card.requiredCoins} coins to redeem this gift card`

            });

        }

        // Wallet Deduct

        user.coins -= card.requiredCoins;

        await user.save();

        // Coin Transaction History

        await CoinTransaction.create({

            userId: user._id,

            coins: card.requiredCoins,

            type: "purchase",

            status: "completed",

            description: `Redeemed Gift Card - ${card.title}`

        });

        // Gift Card Redeemed

        card.isRedeemed = true;

        card.redeemedBy = user._id;

        card.redeemedAt = new Date();

        await card.save();

        return res.status(200).json({

            success: true,

            message: "Gift Card redeemed successfully",

            giftCard: {

                id: card._id,

                title: card.title,

                amount: card.amount,

                code: card.code,

                color: card.color

            },

            deductedCoins: card.requiredCoins,

            remainingCoins: user.coins

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};