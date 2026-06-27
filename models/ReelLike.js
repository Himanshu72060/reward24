const mongoose = require("mongoose");


const reelLikeSchema = new mongoose.Schema(

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

        }

    },

    {
        timestamps: true
    }

);


// same user ek reel ko ek hi baar like kare
reelLikeSchema.index(
    {
        userId: 1,
        reelId: 1
    },
    {
        unique: true
    }
);


module.exports =
    mongoose.model(
        "ReelLike",
        reelLikeSchema
    );