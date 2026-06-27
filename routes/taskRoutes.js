const express = require("express");

const router = express.Router();

const multer = require("multer");

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {

    createTask,

    getTasks,

    getTaskById,

    updateTask,

    deleteTask,

    submitTask,

    getMyTaskSubmissions,

    getSubmissionById,

    getPendingSubmissions,

    approveTaskSubmission,

    rejectTaskSubmission

} = require("../controllers/taskController");


// ==========================
// MULTER
// ==========================

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});


// ==================================================
// ADMIN
// ==================================================

// CREATE TASK
router.post(

    "/",

    auth,

    role("admin"),

    upload.single("image"),

    createTask

);


// UPDATE TASK
router.put(

    "/:id",

    auth,

    role("admin"),

    upload.single("image"),

    updateTask

);


// DELETE TASK
router.delete(

    "/:id",

    auth,

    role("admin"),

    deleteTask

);


// PENDING SUBMISSIONS
router.get(

    "/admin/pending",

    auth,

    role("admin"),

    getPendingSubmissions

);


// APPROVE TASK
router.put(

    "/admin/approve/:id",

    auth,

    role("admin"),

    approveTaskSubmission

);


// REJECT TASK
router.put(

    "/admin/reject/:id",

    auth,

    role("admin"),

    rejectTaskSubmission

);


// ==================================================
// USER
// ==================================================

// GET ALL TASKS
router.get(

    "/",

    auth,

    getTasks

);


// GET SINGLE TASK
router.get(

    "/:id",

    auth,

    getTaskById

);


// SUBMIT TASK (SCREENSHOT)
router.post(

    "/submit/:id",

    auth,

    upload.single("screenshot"),

    submitTask

);


// MY SUBMISSIONS
router.get(

    "/my-submissions",

    auth,

    getMyTaskSubmissions

);


// SINGLE SUBMISSION
router.get(

    "/submission/:id",

    auth,

    getSubmissionById

);


module.exports = router;