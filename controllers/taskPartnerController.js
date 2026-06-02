const TaskPartner =
    require("../models/TaskPartner");

// CREATE

exports.createPartner =
    async (req, res) => {

        try {

            const partner =
                await TaskPartner.create(
                    req.body
                );

            res.status(201).json(
                partner
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };

// GET ALL

exports.getPartners =
    async (req, res) => {

        try {

            const partners =
                await TaskPartner.find();

            res.status(200).json(
                partners
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };

// UPDATE

exports.updatePartner = async (req, res) => {

    try {

        const partner =
            await TaskPartner.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.status(200).json(partner);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE

exports.deletePartner = async (req, res) => {

    try {

        await TaskPartner.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};