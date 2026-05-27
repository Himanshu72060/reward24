const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};