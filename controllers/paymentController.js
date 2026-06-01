const Payment = require("../models/paymentModel");

// CREATE
exports.createPayment = async (req, res) => {
    try {
        const { accountNumber, upiId } = req.body;

        const payment = await Payment.create({
            accountNumber,
            upiId
        });

        res.status(201).json({
            success: true,
            message: "Payment details saved",
            data: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL
exports.getPayments = async (req, res) => {
    try {
        const data = await Payment.find();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE
exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Payment.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.json({
            success: true,
            message: "Updated successfully",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        await Payment.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};