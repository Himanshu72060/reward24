// # models / spinModel.js

const mongoose =
  require("mongoose");

const spinSchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      coinsWon: {

        type: Number,

        required: true,

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(
    "Spin",
    spinSchema
  );
