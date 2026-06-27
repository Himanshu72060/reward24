const ReelWatchHistory = require("../models/ReelWatchHistory");
const Reel = require("../models/Reel");
const CoinTransaction = require("../models/CoinTransaction");
const User = require("../models/User");



// ============================
// WATCH REEL
// ============================

exports.watchReel = async (req, res) => {


    try {


        const {

            reelId,

            watchTime,

            completed

        } = req.body;



        const reel =
            await Reel.findById(reelId);



        if (!reel) {


            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }




        let history =
            await ReelWatchHistory.findOne({

                userId: req.user.id,

                reelId

            });




        // agar pehli baar watch hai

        if (!history) {


            history =
                await ReelWatchHistory.create({

                    userId: req.user.id,

                    reelId,

                    watchTime,

                    completed

                });



            // completed reel par coins

            if (completed === true) {



                const coins = 5;



                await User.findByIdAndUpdate(

                    req.user.id,

                    {

                        $inc: {

                            totalCoins: coins

                        }

                    }

                );





                await CoinTransaction.create({

                    userId: req.user.id,

                    coins,

                    type: "reel_watch",

                    description:
                        "Coins earned by watching reel"

                });


            }



        }


        // agar already watch hai

        else {


            history.watchTime = watchTime;


            history.completed = completed;


            await history.save();


        }




        res.status(200).json({

            success: true,

            message: "Reel watch saved",

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
// GET WATCH HISTORY
// ============================

exports.getWatchHistory = async (req, res) => {


    try {


        const history =

            await ReelWatchHistory.find({

                userId: req.user.id

            })

                .populate(

                    "reelId"

                )

                .sort({

                    createdAt: -1

                });



        res.status(200).json({

            success: true,

            history

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};