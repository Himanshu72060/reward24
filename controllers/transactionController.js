const Transaction =
    require("../models/Transaction");

// CREATE

exports.createTransaction =
    async (req, res) => {

        try {

            const transaction =
                await Transaction.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: transaction
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

exports.getTransactions =
    async (req, res) => {

        try {

            const transactions =
                await Transaction.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({
                success: true,
                data: transactions
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

// GET BY TYPE

exports.getTransactionsByType =
    async (req, res) => {

        try {

            const transactions =
                await Transaction.find({

                    type:
                        req.params.type

                });

            res.status(200).json({
                success: true,
                data: transactions
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

exports.updateTransaction =
    async (req, res) => {

        try {

            const transaction =
                await Transaction.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({
                success: true,
                data: transaction
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

exports.deleteTransaction =
    async (req, res) => {

        try {

            await Transaction.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Deleted Successfully"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };