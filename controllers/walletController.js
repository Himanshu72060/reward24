// const WalletConfig = require("../models/walletModel");

// // 🔥 CREATE / UPDATE WALLET CONFIG (ADMIN)
// exports.saveWalletConfig = async (req, res) => {
//     try {
//         const data = await WalletConfig.findOneAndUpdate(
//             {},
//             req.body,
//             {
//                 new: true,
//                 upsert: true,
//                 runValidators: true
//             }
//         );

//         res.json({
//             success: true,
//             message: "Wallet config saved successfully",
//             data
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // 🌐 GET WALLET CONFIG (PUBLIC)
// exports.getWalletConfig = async (req, res) => {
//     try {
//         const data = await WalletConfig.findOne();

//         res.json({
//             success: true,
//             data
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // update and delete transactions (admin only)

// exports.getTransactions = async (req, res) => {
//     try {
//         const transactions = await Transaction.find().sort({ createdAt: -1 });

//         res.json({
//             success: true,
//             data: transactions
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// exports.updateTransaction = async (req, res) => {
//     try {
//         const transaction = await Transaction.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.json({
//             success: true,
//             data: transaction
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// exports.deleteTransaction = async (req, res) => {
//         try {
//             await Transaction.findByIdAndDelete(req.params.id);
//             res.json({
//                 success: true,
//                 message: "Transaction deleted successfully"
//             });
//         }
//         catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
// };

// exports.getTransactionsByType = async (req, res) => {
//         try {
//             const transactions = await Transaction.find({ type: req.params.type }).sort({ createdAt: -1 });
//             res.json({
//                 success: true,
//                 data: transactions
//             });
//         }
//         catch (error) {
//             res.status(500).json({
//                 success: false, 
//                 message: error.message
//             });
//         }
// };
/////////////////////////////////////////////////////////////////////////////////

// const CoinTransaction = require("../models/CoinTransaction");


// // ============================
// // GET WALLET
// // ============================

// exports.getWallet = async (req, res) => {

//     try {


//         const transactions = await CoinTransaction.find({

//             userId: req.user.id

//         });



//         let totalCoins = 0;



//         transactions.forEach((item) => {

//             if (item.type !== "withdraw") {

//                 totalCoins += item.coins;

//             }
//             else {

//                 totalCoins -= item.coins;

//             }

//         });





//         res.status(200).json({

//             success: true,

//             wallet: {

//                 coins: totalCoins

//             }

//         });





//     } catch (error) {


//         res.status(500).json({

//             success: false,

//             message: error.message

//         });


//     }

// };

///////////////////////////////////////////////////////////////////////

const CoinTransaction = require("../models/CoinTransaction");
const WalletConfig = require("../models/walletModel");

// ==============================
// GET WALLET DETAILS
// ==============================
exports.getWallet = async (req, res) => {
    try {

        const userId = req.user.id;

        // Get Wallet Config
        const walletConfig = await WalletConfig.findOne();

        // Get User Transactions
        const transactions = await CoinTransaction.find({
            userId
        }).sort({ createdAt: -1 });

        let totalCoins = 0;
        let totalEarned = 0;
        let totalWithdrawn = 0;
        let pendingCoins = 0;

        transactions.forEach((transaction) => {

            const coins = Number(transaction.coins || 0);

            // Credit Transactions
            if (
                transaction.type === "reward" ||
                transaction.type === "watch_ad" ||
                transaction.type === "daily_checkin" ||
                transaction.type === "spin" ||
                transaction.type === "referral" ||
                transaction.type === "bonus"
            ) {

                totalEarned += coins;

                if (transaction.status === "pending") {
                    pendingCoins += coins;
                } else {
                    totalCoins += coins;
                }

            }

            // Withdraw Transactions
            if (transaction.type === "withdraw") {

                totalWithdrawn += coins;

                if (
                    transaction.status === "approved" ||
                    transaction.status === "completed"
                ) {
                    totalCoins -= coins;
                }

            }

        });

        if (totalCoins < 0) {
            totalCoins = 0;
        }

        const availableWithdraw =
            totalCoins >= (walletConfig?.minWithdrawCoins || 1000)
                ? totalCoins
                : 0;

        return res.status(200).json({

            success: true,

            wallet: {

                totalCoins,

                availableWithdraw,

                pendingCoins,

                totalEarned,

                totalWithdrawn,

                minWithdrawCoins:
                    walletConfig?.minWithdrawCoins || 1000,

                rateCoins:
                    walletConfig?.rateCoins || 1000,

                rateRupees:
                    walletConfig?.rateRupees || 200,

                withdrawEnabled:
                    walletConfig?.withdrawEnabled ?? true,

                withdrawCharge:
                    walletConfig?.withdrawCharge || 0,

                maxWithdrawPerDay:
                    walletConfig?.maxWithdrawPerDay || 5,

                paymentMethods:
                    walletConfig?.paymentMethods || [],

                rules:
                    walletConfig?.rules || []

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }
};


// ==============================
// GET COIN HISTORY
// ==============================
exports.getCoinHistory = async (req, res) => {

    try {

        const transactions = await CoinTransaction
            .find({
                userId: req.user.id
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,
            count: transactions.length,
            history: transactions

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};