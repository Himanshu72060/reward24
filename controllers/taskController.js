const Task = require("../models/Task");

const TaskSubmission = require("../models/TaskSubmission");

const User = require("../models/User");

const CoinTransaction = require("../models/CoinTransaction");

const axios = require("axios");

const bunny = require("../config/bunny");

const uploadToBunny = async (file, folder) => {

    const fileName = Date.now() + "-" + file.originalname;

    const uploadPath = folder + "/" + fileName;

    await axios.put(
        bunny.storageUrl + uploadPath,
        file.buffer,
        {
            headers: {
                AccessKey: bunny.accessKey,
                "Content-Type": file.mimetype
            }
        }
    );

    return bunny.cdnUrl + "/" + uploadPath;
};

exports.createTask = async (req, res) => {

    try {

        const {

            title,

            subtitle,

            description,

            playStoreUrl,

            coins,

            category,

            taskType,

            partnerId,

            isFeatured

        } = req.body;

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Task image is required"

            });

        }

        const imageUrl = await uploadToBunny(

            req.file,

            "tasks"

        );

        const task = await Task.create({

            title,

            subtitle,

            description,

            imageUrl,

            playStoreUrl,

            coins,

            category,

            taskType,

            partnerId,

            isFeatured,

            createdBy: req.user.id

        });

        return res.status(201).json({

            success: true,

            message: "Task created successfully",

            task

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            isActive: true

        })

            .populate("partnerId")

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: tasks.length,

            tasks

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getTaskById = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)

            .populate("partnerId");

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        return res.status(200).json({

            success: true,

            task

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        if (req.file) {

            task.imageUrl = await uploadToBunny(

                req.file,

                "tasks"

            );

        }

        task.title = req.body.title || task.title;

        task.subtitle = req.body.subtitle || task.subtitle;

        task.description = req.body.description || task.description;

        task.playStoreUrl = req.body.playStoreUrl || task.playStoreUrl;

        task.coins = req.body.coins || task.coins;

        task.category = req.body.category || task.category;

        task.taskType = req.body.taskType || task.taskType;

        task.partnerId = req.body.partnerId || task.partnerId;

        if (req.body.isFeatured !== undefined) {

            task.isFeatured = req.body.isFeatured;

        }

        if (req.body.isActive !== undefined) {

            task.isActive = req.body.isActive;

        }

        await task.save();

        return res.status(200).json({

            success: true,

            message: "Task updated successfully",

            task

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        await task.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Task deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// USER SUBMIT TASK
// ==========================

exports.submitTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        if (!task.isActive) {

            return res.status(400).json({

                success: false,

                message: "Task is inactive"

            });

        }

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Screenshot is required"

            });

        }

        // Check existing submission

        const existing = await TaskSubmission.findOne({

            taskId: task._id,

            userId: req.user.id,

            status: {

                $in: [

                    "pending",

                    "approved"

                ]

            }

        });

        if (existing) {

            return res.status(400).json({

                success: false,

                message: "Task already submitted"

            });

        }

        // Upload Screenshot

        const screenshot = await uploadToBunny(

            req.file,

            "task-submissions"

        );

        // Save Submission

        const submission = await TaskSubmission.create({

            taskId: task._id,

            userId: req.user.id,

            screenshot,

            status: "pending"

        });

        return res.status(201).json({

            success: true,

            message: "Task submitted successfully. Waiting for admin approval.",

            submission

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================
// USER MY SUBMISSIONS
// ==========================

exports.getMyTaskSubmissions = async (req, res) => {

    try {

        const submissions = await TaskSubmission.find({

            userId: req.user.id

        })

            .populate({

                path: "taskId",

                populate: {

                    path: "partnerId"

                }

            })

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: submissions.length,

            data: submissions

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================
// GET SINGLE SUBMISSION
// ==========================

exports.getSubmissionById = async (req, res) => {

    try {

        const submission = await TaskSubmission.findById(

            req.params.id

        )

            .populate("taskId")

            .populate(

                "userId",

                "name email"

            );

        if (!submission) {

            return res.status(404).json({

                success: false,

                message: "Submission not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: submission

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// ADMIN - GET PENDING SUBMISSIONS
// ==========================

exports.getPendingSubmissions = async (req, res) => {

    try {

        const submissions = await TaskSubmission.find({

            status: "pending"

        })

            .populate("userId", "name email")

            .populate("taskId")

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: submissions.length,

            data: submissions

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================
// ADMIN APPROVE TASK
// ==========================

exports.approveTaskSubmission = async (req, res) => {

    try {

        const submission = await TaskSubmission.findById(req.params.id)

            .populate("taskId")

            .populate("userId");

        if (!submission) {

            return res.status(404).json({

                success: false,

                message: "Submission not found"

            });

        }

        if (submission.status !== "pending") {

            return res.status(400).json({

                success: false,

                message: "Submission already processed"

            });

        }

        const user = await User.findById(submission.userId._id);

        const task = await Task.findById(submission.taskId._id);

        if (!user || !task) {

            return res.status(404).json({

                success: false,

                message: "User or Task not found"

            });

        }

        // Wallet Update
        user.coins += task.coins;
        user.totalEarnedCoins += task.coins;

        await user.save();

        // Coin Transaction
        await CoinTransaction.create({

            userId: user._id,

            coins: task.coins,

            type: "reward",

            status: "completed",

            description: `Task Reward - ${task.title}`

        });

        // Update Submission
        submission.status = "approved";
        submission.rewardGiven = true;
        submission.approvedBy = req.user.id;
        submission.approvedAt = new Date();

        await submission.save();

        // Update Task
        task.totalCompleted += 1;

        await task.save();

        return res.status(200).json({

            success: true,

            message: "Task approved successfully",

            rewardCoins: task.coins,

            totalCoins: user.coins,

            submission

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================
// ADMIN REJECT TASK
// ==========================

exports.rejectTaskSubmission = async (req, res) => {

    try {

        const submission = await TaskSubmission.findById(req.params.id);

        if (!submission) {

            return res.status(404).json({

                success: false,

                message: "Submission not found"

            });

        }

        if (submission.status !== "pending") {

            return res.status(400).json({

                success: false,

                message: "Submission already processed"

            });

        }

        submission.status = "reject";

        submission.adminRemark = req.body.adminRemark || "";

        submission.approvedBy = req.user.id;

        submission.approvedAt = new Date();

        await submission.save();

        return res.status(200).json({

            success: true,

            message: "Task rejected successfully",

            submission

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

