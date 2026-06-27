const ReelLike = require("../models/ReelLike");
const Reel = require("../models/Reel");



// ============================
// LIKE REEL
// ============================

exports.likeReel = async (req, res) => {


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





        const alreadyLiked =

            await ReelLike.findOne({

                userId: req.user.id,

                reelId

            });




        if (alreadyLiked) {


            return res.status(400).json({

                success: false,

                message: "Already liked"

            });


        }





        const like =

            await ReelLike.create({

                userId: req.user.id,

                reelId

            });




        const totalLikes =

            await ReelLike.countDocuments({

                reelId

            });




        res.status(201).json({

            success: true,

            message: "Reel liked",

            totalLikes,

            like

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};






// ============================
// UNLIKE REEL
// ============================

exports.unlikeReel = async (req, res) => {


    try {


        const {

            reelId

        } = req.body;



        const like =

            await ReelLike.findOne({

                userId: req.user.id,

                reelId

            });




        if (!like) {


            return res.status(404).json({

                success: false,

                message: "Like not found"

            });

        }




        await ReelLike.findByIdAndDelete(

            like._id

        );




        const totalLikes =

            await ReelLike.countDocuments({

                reelId

            });




        res.status(200).json({

            success: true,

            message: "Reel unlike",

            totalLikes

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};






// ============================
// GET REEL LIKES
// ============================

exports.getReelLikes = async (req, res) => {


    try {


        const likes =

            await ReelLike.find({

                reelId: req.params.reelId

            })

                .populate(

                    "userId",

                    "name profileImage"

                );




        res.status(200).json({

            success: true,

            totalLikes: likes.length,

            likes

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};