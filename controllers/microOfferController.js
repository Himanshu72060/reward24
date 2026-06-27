const MicroOffer = require("../models/MicroOffer");
const MicroOfferHistory = require("../models/MicroOfferHistory");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");


// ======================================
// ADMIN - CREATE MICRO OFFER
// ======================================

exports.createMicroOffer = async (req, res) => {

    try {

        const {

            screenTitle,

            quickOffers,

            curatedAds,

            ptcPartners,

            taskDetails

        } = req.body;

        if (!screenTitle) {

            return res.status(400).json({

                success: false,

                message: "Screen title is required"

            });

        }

        const microOffer = await MicroOffer.create({

            screenTitle,

            quickOffers: quickOffers || [],

            curatedAds: curatedAds || [],

            ptcPartners: ptcPartners || [],

            taskDetails: taskDetails || [],

            totalCompleted: 0,

            isActive: true

        });

        return res.status(201).json({

            success: true,

            message: "Micro Offer Created Successfully",

            data: microOffer

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// ADMIN - GET ALL MICRO OFFERS
// ======================================

exports.getMicroOffers = async (req, res) => {

    try {

        const offers = await MicroOffer.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: offers.length,

            data: offers

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// ADMIN - GET SINGLE MICRO OFFER
// ======================================

exports.getSingleMicroOffer = async (req, res) => {

    try {

        const offer = await MicroOffer.findById(req.params.id);

        if (!offer) {

            return res.status(404).json({

                success: false,

                message: "Micro Offer not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: offer

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// ADMIN - UPDATE MICRO OFFER
// ======================================

exports.updateMicroOffer = async (req, res) => {

    try {

        const offer = await MicroOffer.findById(req.params.id);

        if (!offer) {

            return res.status(404).json({

                success: false,

                message: "Micro Offer not found"

            });

        }

        offer.screenTitle =
            req.body.screenTitle || offer.screenTitle;

        offer.quickOffers =
            req.body.quickOffers || offer.quickOffers;

        offer.curatedAds =
            req.body.curatedAds || offer.curatedAds;

        offer.ptcPartners =
            req.body.ptcPartners || offer.ptcPartners;

        offer.taskDetails =
            req.body.taskDetails || offer.taskDetails;

        if (req.body.isActive !== undefined) {

            offer.isActive = req.body.isActive;

        }

        await offer.save();

        return res.status(200).json({

            success: true,

            message: "Micro Offer Updated Successfully",

            data: offer

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// ADMIN - DELETE MICRO OFFER
// ======================================

exports.deleteMicroOffer = async (req, res) => {

    try {

        const offer = await MicroOffer.findById(req.params.id);

        if (!offer) {

            return res.status(404).json({

                success: false,

                message: "Micro Offer not found"

            });

        }

        await offer.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Micro Offer Deleted Successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// USER - GET ACTIVE MICRO OFFERS
// ======================================

exports.getUserMicroOffers = async (req, res) => {

    try {

        const offers = await MicroOffer.find({

            isActive: true

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: offers.length,

            data: offers

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// USER - COMPLETE MICRO OFFER
// ======================================

exports.completeMicroOffer = async (req, res) => {

    try {

        const { section, offerIndex } = req.body;

        if (!section || offerIndex === undefined) {

            return res.status(400).json({

                success: false,

                message: "section and offerIndex are required"

            });

        }

        const microOffer = await MicroOffer.findById(req.params.id);

        if (!microOffer) {

            return res.status(404).json({

                success: false,

                message: "Micro Offer not found"

            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        // ===============================
        // ALREADY COMPLETED ?
        // ===============================

        const alreadyCompleted = await MicroOfferHistory.findOne({

            userId: user._id,

            microOfferId: microOffer._id,

            section,

            offerIndex

        });

        if (alreadyCompleted) {

            return res.status(400).json({

                success: false,

                message: "Offer already completed"

            });

        }

        let offer = null;

        // ===============================
        // FIND OFFER
        // ===============================

        if (section === "quickOffer") {

            offer = microOffer.quickOffers[offerIndex];

        }

        else if (section === "curatedAd") {

            offer = microOffer.curatedAds[offerIndex];

        }

        else if (section === "ptcPartner") {

            offer = microOffer.ptcPartners[offerIndex];

        }

        if (!offer) {

            return res.status(404).json({

                success: false,

                message: "Offer not found"

            });

        }

        // ===============================
        // WALLET UPDATE
        // ===============================

        user.coins += offer.rewardCoins;

        user.totalEarnedCoins += offer.rewardCoins;

        await user.save();

        // ===============================
        // HISTORY
        // ===============================

        const history = await MicroOfferHistory.create({

            userId: user._id,

            microOfferId: microOffer._id,

            section,

            offerIndex,

            rewardCoins: offer.rewardCoins,

            status: "completed"

        });

        // ===============================
        // COIN TRANSACTION
        // ===============================

        await CoinTransaction.create({

            userId: user._id,

            coins: offer.rewardCoins,

            type: "bonus",

            status: "completed",

            description: `${section} Reward`

        });

        // ===============================
        // TOTAL COMPLETED
        // ===============================

        microOffer.totalCompleted += 1;

        await microOffer.save();

        return res.status(200).json({

            success: true,

            message: "Reward claimed successfully",

            rewardCoins: offer.rewardCoins,

            totalCoins: user.coins,

            data: history

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ======================================
// USER - MY MICRO OFFER HISTORY
// ======================================

exports.getMyMicroOfferHistory = async (req, res) => {

    try {

        const history = await MicroOfferHistory.find({

            userId: req.user.id

        })

            .populate(

                "microOfferId",

                "screenTitle"

            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: history.length,

            data: history

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};