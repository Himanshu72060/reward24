const Game =
    require("../models/Game");

// CREATE

exports.createGame =
    async (req, res) => {

        try {

            const game =
                await Game.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: game
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

// GET ALL

exports.getGames =
    async (req, res) => {

        try {

            const games =
                await Game.find();

            res.status(200).json({
                success: true,
                data: games
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

// GET SINGLE

exports.getSingleGame =
    async (req, res) => {

        try {

            const game =
                await Game.findById(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                data: game
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

// UPDATE

exports.updateGame =
    async (req, res) => {

        try {

            const game =
                await Game.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

            res.status(200).json({
                success: true,
                data: game
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

// DELETE

exports.deleteGame =
    async (req, res) => {

        try {

            await Game.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Game Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };