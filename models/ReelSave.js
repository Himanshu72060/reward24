const mongoose = require("mongoose");


const reelSaveSchema = new mongoose.Schema(

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


reelSaveSchema.index(

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
        "ReelSave",
        reelSaveSchema
    );