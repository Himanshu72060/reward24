const mongoose = require("mongoose");


const reelCommentSchema = new mongoose.Schema(

    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        reelId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Reel",

            required: true

        },


        comment: {

            type: String,

            required: true,

            trim: true

        }

    },

    {
        timestamps: true
    }

);


module.exports =
    mongoose.model(
        "ReelComment",
        reelCommentSchema
    );