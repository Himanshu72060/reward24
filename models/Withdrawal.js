const mongoose =
    require("mongoose");

const withdrawalSchema =
    new mongoose.Schema(

        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            coins: {
                type: Number,
                required: true
            },

            amount: {
                type: Number,
                required: true
            },

            upiId: {
                type: String,
                required: true
            },

            accountHolderName: {
                type: String,
                default: ""
            },

            status: {
                type: String,
                enum: [
                    "pending",
                    "approved",
                    "rejected"
                ],
                default: "pending"
            },

            adminRemark: {
                type: String,
                default: ""
            },

            processedAt: {
                type: Date,
                default: null
            }
        },

        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Withdrawal",
        withdrawalSchema
    );