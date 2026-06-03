const User =
    require("../models/User");

const UpiWithdraw =
    require("../models/upiWithdrawModel");

const BankWithdraw =
    require("../models/bankWithdrawModel");

const WithdrawInfo =
    require("../models/withdrawInfoModel");


// UPI WITHDRAW

exports.createUpiWithdraw =
    async (req, res) => {

        try {

            const {
                amount,
                upiId,
                confirmUpiId
            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (
                upiId !==
                confirmUpiId
            ) {
                return res.status(400).json({
                    success: false,
                    message: "UPI IDs do not match"
                });
            }

            const withdraw =
                await UpiWithdraw.create({

                    userId:
                        user._id,

                    amount,

                    upiId,

                    confirmUpiId

                });

            return res.status(201).json({
                success: true,
                data: withdraw
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };



// BANK WITHDRAW

exports.createBankWithdraw =
    async (req, res) => {

        try {

            const {
                amount,
                accountHolderName,
                accountNumber,
                ifscCode
            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const withdraw =
                await BankWithdraw.create({

                    userId:
                        user._id,

                    amount,

                    accountHolderName,

                    accountNumber,

                    ifscCode

                });

            return res.status(201).json({
                success: true,
                data: withdraw
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };



// GET TERMS

exports.getTerms =
    async (req, res) => {

        try {

            const { type } =
                req.params;

            const terms =
                await WithdrawInfo.find({
                    type
                });

            return res.status(200).json({
                success: true,
                data: terms
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.getMyUpiWithdraws = async (req, res) => {

    try {

        const data =
            await UpiWithdraw.find({
                userId: req.user.id
            });

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getMyBankWithdraws = async (req, res) => {

    try {

        const data =
            await BankWithdraw.find({
                userId: req.user.id
            });

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getAllUpiWithdraws =
    async (req, res) => {

        try {

            const data =
                await UpiWithdraw
                    .find()
                    .populate(
                        "userId",
                        "fullName email mobileNumber"
                    );

            return res.status(200).json({
                success: true,
                data
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.getAllBankWithdraws =
    async (req, res) => {

        try {

            const data =
                await BankWithdraw
                    .find()
                    .populate(
                        "userId",
                        "fullName email mobileNumber"
                    );

            return res.status(200).json({
                success: true,
                data
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };
    
exports.approveUpiWithdraw =
    async (req, res) => {

        try {

            const withdraw =
                await UpiWithdraw.findByIdAndUpdate(

                    req.params.id,

                    {
                        status: "Approved"
                    },

                    {
                        new: true
                    }

                );

            return res.status(200).json({
                success: true,
                data: withdraw
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.rejectUpiWithdraw =
    async (req, res) => {

        try {

            const withdraw =
                await UpiWithdraw.findByIdAndUpdate(

                    req.params.id,

                    {
                        status: "Rejected"
                    },

                    {
                        new: true
                    }

                );

            return res.status(200).json({
                success: true,
                data: withdraw
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };
    
exports.approveBankWithdraw =
    async (req, res) => {

        try {

            const withdraw =
                await BankWithdraw.findByIdAndUpdate(

                    req.params.id,

                    {
                        status: "Approved"
                    },

                    {
                        new: true
                    }

                );

            return res.status(200).json({
                success: true,
                data: withdraw
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };
    
exports.rejectBankWithdraw =
    async (req, res) => {

        try {

            const withdraw =
                await BankWithdraw.findByIdAndUpdate(

                    req.params.id,

                    {
                        status: "Rejected"
                    },

                    {
                        new: true
                    }

                );

            return res.status(200).json({
                success: true,
                data: withdraw
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };
    
exports.createTerm =
    async (req, res) => {

        try {

            const term =
                await WithdrawInfo.create(
                    req.body
                );

            return res.status(201).json({
                success: true,
                data: term
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.updateTerm =
    async (req, res) => {

        try {

            const term =
                await WithdrawInfo.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            return res.status(200).json({
                success: true,
                data: term
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };
 
exports.deleteTerm =
    async (req, res) => {

        try {

            await WithdrawInfo.findByIdAndDelete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Deleted Successfully"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };


    