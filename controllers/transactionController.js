const Transaction =
    require("../models/Transaction");


// CREATE

exports.createTransaction =
    async (req, res) => {

        try {

            const transaction =
                await Transaction.create({

                    ...req.body,

                    userId:
                        req.user.id

                });

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


// GET USER TRANSACTIONS

exports.getTransactions =
    async (req, res) => {

        try {

            const transactions =
                await Transaction.find({

                    userId:
                        req.user.id

                }).sort({
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


// GET USER TRANSACTIONS BY TYPE

exports.getTransactionsByType =
    async (req, res) => {

        try {

            const transactions =
                await Transaction.find({

                    userId:
                        req.user.id,

                    type:
                        req.params.type

                }).sort({
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


// UPDATE

exports.updateTransaction =
    async (req, res) => {

        try {

            const transaction =
                await Transaction.findOneAndUpdate(

                    {

                        _id:
                            req.params.id,

                        userId:
                            req.user.id

                    },

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

            await Transaction.findOneAndDelete({

                _id:
                    req.params.id,

                userId:
                    req.user.id

            });

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