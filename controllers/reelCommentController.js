const ReelComment = require("../models/ReelComment");
const Reel = require("../models/Reel");



// ============================
// ADD COMMENT
// ============================

exports.addComment = async (req, res) => {


    try {


        const {

            reelId,

            comment

        } = req.body;



        if (!reelId || !comment) {


            return res.status(400).json({

                success: false,

                message: "ReelId and comment required"

            });

        }



        const reel =

            await Reel.findById(reelId);



        if (!reel) {


            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }





        const newComment =

            await ReelComment.create({

                userId: req.user.id,

                reelId,

                comment

            });




        res.status(201).json({

            success: true,

            message: "Comment added",

            comment: newComment

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};








// ============================
// GET COMMENTS
// ============================

exports.getComments = async (req, res) => {


    try {


        const comments =

            await ReelComment.find({

                reelId: req.params.reelId

            })

                .populate(

                    "userId",

                    "name profileImage"

                )

                .sort({

                    createdAt: -1

                });




        res.status(200).json({

            success: true,

            total: comments.length,

            comments

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};









// ============================
// DELETE COMMENT
// ============================

exports.deleteComment = async (req, res) => {


    try {


        const comment =

            await ReelComment.findById(

                req.params.id

            );




        if (!comment) {


            return res.status(404).json({

                success: false,

                message: "Comment not found"

            });

        }




        if (

            comment.userId.toString()

            !== req.user.id

        ) {


            return res.status(403).json({

                success: false,

                message: "You can delete only your comment"

            });


        }





        await ReelComment.findByIdAndDelete(

            req.params.id

        );




        res.status(200).json({

            success: true,

            message: "Comment deleted"

        });




    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};