const WalletConfig = require("../models/walletModel");

// 🔥 CREATE / UPDATE CONFIG (ADMIN)
exports.saveWalletConfig = async (req, res) => {
    try {
        const data = await WalletConfig.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            message: "Wallet config saved",
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// 🔥 GET CONFIG (PUBLIC)
exports.getWalletConfig = async (req, res) => {
    try {
        const data = await WalletConfig.findOne();

        res.json({
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// GET ALL
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: transactions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// update transaction
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id
            },
            req.body,
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }
        res.json({
            success: true,
            data: transaction
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete(
            { _id: req.params.id, userId: req.user.id }
        );
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }
        res.json({
            success: true,
            message: "Transaction deleted"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

