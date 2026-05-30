const GiftCard =
    require("../models/GiftCard");

// CREATE

exports.createGiftCard =
    async (req, res) => {

        try {

            const card =
                await GiftCard.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: card
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

exports.getGiftCards =
    async (req, res) => {

        try {

            const cards =
                await GiftCard.find()
                    .sort({
                        createdAt: -1
                    });

            res.json({
                success: true,
                data: cards
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

exports.getGiftCard =
    async (req, res) => {

        try {

            const card =
                await GiftCard.findById(
                    req.params.id
                );

            res.json({
                success: true,
                data: card
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

exports.updateGiftCard =
    async (req, res) => {

        try {

            const card =
                await GiftCard.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json({
                success: true,
                data: card
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

exports.deleteGiftCard =
    async (req, res) => {

        try {

            await GiftCard.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Gift Card Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };