const WalletConfig = require("../models/walletModel");

// 🔥 CREATE / UPDATE WALLET CONFIG (ADMIN)
exports.saveWalletConfig = async (req, res) => {
    try {
        const data = await WalletConfig.findOneAndUpdate(
            {},
            req.body,
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.json({
            success: true,
            message: "Wallet config saved successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 🌐 GET WALLET CONFIG (PUBLIC)
exports.getWalletConfig = async (req, res) => {
    try {
        const data = await WalletConfig.findOne();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// update and delete transactions (admin only)

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: transactions
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteTransaction = async (req, res) => {
        try {
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                message: "Transaction deleted successfully"
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
};

exports.getTransactionsByType = async (req, res) => {
        try {
            const transactions = await Transaction.find({ type: req.params.type }).sort({ createdAt: -1 });
            res.json({
                success: true,
                data: transactions
            });
        }
        catch (error) {
            res.status(500).json({
                success: false, 
                message: error.message
            });
        }
};


