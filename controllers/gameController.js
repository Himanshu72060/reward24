const Game = require("../models/Game");
const GameHistory = require("../models/GameHistory");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");

const uploadToBunny = require("../utils/bunnyUpload");

// =======================================
// ADMIN - CREATE GAME
// =======================================

exports.createGame = async (req, res) => {

    try {

        const {

            title,
            subTitle,
            rating,
            accentColor,
            playStoreUrl,
            campaignDetails

        } = req.body;

        let parsedCampaignDetails = [];

        try {

            if (req.body.campaignDetails) {

                parsedCampaignDetails = JSON.parse(
                    req.body.campaignDetails
                );

            }

        } catch (err) {

            return res.status(400).json({

                success: false,

                message: "Invalid campaignDetails JSON"

            });

        }

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Game image is required"

            });

        }

        // Upload Image To Bunny
        const imageUrl = await uploadToBunny(

            req.file.buffer,

            Date.now() + "-" + req.file.originalname,

            "games"

        );

        const game = await Game.create({

            title,

            subTitle,

            rating,

            imageUrl,

            accentColor,

            playStoreUrl,

            // campaignDetails: campaignDetails || [],
            campaignDetails: parsedCampaignDetails,

            totalCompleted: 0,

            isActive: true

        });

        return res.status(201).json({

            success: true,

            message: "Game created successfully",

            data: game

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// ADMIN - GET ALL GAMES
// =======================================

exports.getGames = async (req, res) => {

    try {

        const games = await Game.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: games.length,

            data: games

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// ADMIN - GET SINGLE GAME
// =======================================

exports.getSingleGame = async (req, res) => {

    try {

        const game = await Game.findById(req.params.id);

        if (!game) {

            return res.status(404).json({

                success: false,

                message: "Game not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: game

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// ADMIN - UPDATE GAME
// =======================================

exports.updateGame = async (req, res) => {

    try {

        const game = await Game.findById(req.params.id);

        if (!game) {

            return res.status(404).json({

                success: false,

                message: "Game not found"

            });

        }

        // Upload New Image (Optional)

        if (req.file) {

            const imageUrl = await uploadToBunny(

                req.file.buffer,

                Date.now() + "-" + req.file.originalname,

                "games"

            );

            game.imageUrl = imageUrl;

        }

        game.title =
            req.body.title || game.title;

        game.subTitle =
            req.body.subTitle || game.subTitle;

        game.rating =
            req.body.rating || game.rating;

        game.accentColor =
            req.body.accentColor || game.accentColor;

        game.playStoreUrl =
            req.body.playStoreUrl || game.playStoreUrl;

        // game.campaignDetails =
        //     req.body.campaignDetails || game.campaignDetails;

        if (req.body.campaignDetails) {

            game.campaignDetails = JSON.parse(
                req.body.campaignDetails
            );

        }

        if (req.body.isActive !== undefined) {

            game.isActive = req.body.isActive;

        }

        await game.save();

        return res.status(200).json({

            success: true,

            message: "Game updated successfully",

            data: game

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// ADMIN - DELETE GAME
// =======================================

exports.deleteGame = async (req, res) => {

    try {

        const game = await Game.findById(req.params.id);

        if (!game) {

            return res.status(404).json({

                success: false,

                message: "Game not found"

            });

        }

        await game.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Game deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =======================================
// USER - GET ACTIVE GAMES
// =======================================

exports.getUserGames = async (req, res) => {

    try {

        const games = await Game.find({

            isActive: true

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: games.length,

            data: games

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// =======================================
// USER - COMPLETE GAME STEP
// =======================================

exports.completeGame = async (req, res) => {

    try {

        const { stepId } = req.body;

        if (!stepId) {

            return res.status(400).json({

                success: false,

                message: "stepId is required"

            });

        }

        const game = await Game.findById(req.params.id);

        if (!game) {

            return res.status(404).json({

                success: false,

                message: "Game not found"

            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        // Already Completed

        const alreadyCompleted = await GameHistory.findOne({

            userId: user._id,

            gameId: game._id,

            stepId

        });

        if (alreadyCompleted) {

            return res.status(400).json({

                success: false,

                message: "Reward already claimed"

            });

        }

        let rewardStep = null;

        for (const campaign of game.campaignDetails) {

            const found = campaign.steps.find(

                step => step.stepId === stepId

            );

            if (found) {

                rewardStep = found;

                break;

            }

        }

        if (!rewardStep) {

            return res.status(404).json({

                success: false,

                message: "Game step not found"

            });

        }

        // ==========================
        // UPDATE USER WALLET
        // ==========================

        user.coins += rewardStep.rewardCoins;

        user.totalEarnedCoins += rewardStep.rewardCoins;

        await user.save();

        // ==========================
        // SAVE GAME HISTORY
        // ==========================

        const history = await GameHistory.create({

            userId: user._id,

            gameId: game._id,

            stepId,

            rewardCoins: rewardStep.rewardCoins,

            status: "completed"

        });

        // ==========================
        // SAVE COIN TRANSACTION
        // ==========================

        await CoinTransaction.create({

            userId: user._id,

            coins: rewardStep.rewardCoins,

            type: "bonus",

            status: "completed",

            description: `Game Reward - ${game.title}`

        });

        // ==========================
        // UPDATE GAME COUNT
        // ==========================

        game.totalCompleted += 1;

        await game.save();

        return res.status(200).json({

            success: true,

            message: "Reward claimed successfully",

            rewardCoins: rewardStep.rewardCoins,

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


// =======================================
// USER - GAME HISTORY
// =======================================

exports.getMyGameHistory = async (req, res) => {

    try {

        const history = await GameHistory.find({

            userId: req.user.id

        })

            .populate(

                "gameId",

                "title imageUrl"

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