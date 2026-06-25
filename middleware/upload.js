// middleware/upload.js

const multer = require("multer");

// ================= MULTER MEMORY STORAGE =================

const storage = multer.memoryStorage();

// ================= FILE FILTER =================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        // VIDEO
        "video/mp4",
        "video/mkv",
        "video/webm",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-matroska",
        // IMAGE
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type: ${file.mimetype}`), false);
    }

};

// ================= UPLOAD CONFIG =================

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024, // 500MB
    },
});

module.exports = upload;
