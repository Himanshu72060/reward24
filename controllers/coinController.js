const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");




// ============================
// ADMIN ADD COINS
// ============================

exports.addCoins = async (req, res) => {

    try {


        const {

            userId,
            coins,
            type,
            description

        } = req.body;




        if (!userId || !coins || !type) {


            return res.status(400).json({

                success: false,

                message: "userId, coins and type required"

            });

        }




        const user = await User.findById(userId);




        if (!user) {


            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }





        // UPDATE USER WALLET COINS

        user.coins =

            (user.coins || 0) + Number(coins);





        // TOTAL EARNED COINS

        user.totalEarnedCoins =

            (user.totalEarnedCoins || 0) + Number(coins);





        await user.save();







        // SAVE TRANSACTION HISTORY

        const transaction =

            await CoinTransaction.create({

                userId: user._id,

                coins: Number(coins),

                type,

                description

            });







        res.status(200).json({

            success: true,

            message: "Coins added successfully",

            coins: user.coins,

            transaction

        });





    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};









// ============================
// USER COIN HISTORY
// ============================

exports.getCoinHistory = async (req, res) => {


    try {


        const history = await CoinTransaction.find({

            userId: req.user.id

        })

            .sort({

                createdAt: -1

            });





        res.status(200).json({

            success: true,

            total: history.length,

            history

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });

    }


};









// ============================
// USER TOTAL COINS
// ============================

exports.getMyCoins = async (req, res) => {


    try {


        const user = await User.findById(

            req.user.id

        )

            .select(

                "coins"

            );





        if (!user) {


            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }






        res.status(200).json({

            success: true,

            coins: user.coins || 0

        });





    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });

    }


};