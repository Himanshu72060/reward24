const ReelSave = require("../models/ReelSave");
const Reel = require("../models/Reel");



// ============================
// SAVE REEL
// ============================

exports.saveReel = async (req, res) => {


    try {


        const {

            reelId

        } = req.body;



        const reel =

            await Reel.findById(reelId);



        if (!reel) {


            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }





        const alreadySaved =

            await ReelSave.findOne({

                userId: req.user.id,

                reelId

            });




        if (alreadySaved) {


            return res.status(400).json({

                success: false,

                message: "Already saved"

            });


        }





        const saved =

            await ReelSave.create({

                userId: req.user.id,

                reelId

            });





        res.status(201).json({

            success: true,

            message: "Reel saved",

            saved

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};







// ============================
// REMOVE SAVED REEL
// ============================

exports.removeSave = async (req, res) => {


    try {


        const {

            reelId

        } = req.body;




        const saved =

            await ReelSave.findOne({

                userId: req.user.id,

                reelId

            });





        if (!saved) {


            return res.status(404).json({

                success: false,

                message: "Saved reel not found"

            });


        }




        await ReelSave.findByIdAndDelete(

            saved._id

        );





        res.status(200).json({

            success: true,

            message: "Removed from saved"

        });





    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};









// ============================
// GET SAVED REELS
// ============================

exports.getSavedReels = async (req, res) => {


    try {


        const savedReels =

            await ReelSave.find({

                userId: req.user.id

            })

                .populate({

                    path: "reelId",

                    populate: {

                        path: "userId",

                        select: "name profileImage"

                    }

                })

                .sort({

                    createdAt: -1

                });





        res.status(200).json({

            success: true,

            total: savedReels.length,

            savedReels

        });





    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};