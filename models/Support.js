const mongoose =
    require("mongoose");

// FAQ SCHEMA

const faqSchema =
    new mongoose.Schema({

        question: {
            type: String,
            required: true
        },

        answer: {
            type: String,
            required: true
        }

    });

// SUPPORT SCHEMA

const supportSchema =
    new mongoose.Schema(

        {

            support_email: {
                type: String,
                required: true
            },

            email_subject: {
                type: String,
                required: true
            },

            email_body: {
                type: String,
                required: true
            },

            whatsapp_number: {
                type: String,
                required: true
            },

            whatsapp_default_message: {
                type: String,
                required: true
            },

            faqs: [
                faqSchema
            ]

        },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "Support",
        supportSchema
    );