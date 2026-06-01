const Ad =
    require("../models/Ad");

// CREATE

exports.createAd =
    async (req, res) => {

        try {

            const ad =
                await Ad.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: ad
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };


// GET RANDOM ACTIVE AD

exports.getAd =
    async (req, res) => {

        try {

            const ads =
                await Ad.find({
                    isActive: true
                });

            if (
                ads.length === 0
            ) {

                return res.json({
                    success: true,
                    data: null
                });

            }

            const randomAd =
                ads[
                Math.floor(
                    Math.random() *
                    ads.length
                )
                ];

            res.json({
                success: true,
                data: randomAd
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

exports.updateAd =
    async (req, res) => {

        try {

            const ad =
                await Ad.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json({
                success: true,
                data: ad
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

exports.deleteAd =
    async (req, res) => {

        try {

            await Ad.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Ad Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };