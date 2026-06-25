 

// utils/bunnyUpload.js

const axios = require("axios");

// ================= SANITIZE FILE NAME =================

const sanitizeFileName = (fileName) => {

    return fileName
        .replace(/\s+/g, "-")        // spaces → dash
        .replace(/[^a-zA-Z0-9.\-_]/g, "")  // special chars remove
        .toLowerCase();              // lowercase

};

// ================= BUNNY UPLOAD FUNCTION =================

const uploadToBunny = async (fileBuffer, fileName, folder = "") => {

    try {

        // STORAGE ZONE NAME
        const storageZone = process.env.BUNNY_STORAGE_ZONE;

        // ACCESS KEY
        const accessKey = process.env.BUNNY_ACCESS_KEY;

        // PULL ZONE URL
        const pullZone = process.env.BUNNY_PULL_ZONE;

        // VALIDATE ENV VARIABLES
        if (!storageZone || !accessKey || !pullZone) {
            throw new Error(
                "Missing Bunny env variables: check BUNNY_STORAGE_ZONE, BUNNY_ACCESS_KEY, BUNNY_PULL_ZONE"
            );
        }

        // SANITIZE FILE NAME — remove spaces & special chars
        const cleanFileName = sanitizeFileName(fileName);

        // IF FOLDER IS PROVIDED, PREPEND IT
        const filePath = folder
            ? `${folder}/${cleanFileName}`
            : cleanFileName;

        // FILE UPLOAD URL
        const uploadUrl = `https://storage.bunnycdn.com/${storageZone}/${filePath}`;

        console.log("Uploading to Bunny =>", uploadUrl);

        // UPLOAD FILE TO BUNNY.NET
        await axios.put(
            uploadUrl,
            fileBuffer,
            {
                headers: {
                    AccessKey: accessKey,
                    "Content-Type": "application/octet-stream",
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            }
        );

        // RETURN PUBLIC CDN URL
        const publicUrl = `${pullZone}/${filePath}`;

        console.log("Bunny Upload Success =>", publicUrl);

        return publicUrl;

    } catch (error) {

        console.log("Bunny Upload Error =>", error.message);
        throw new Error("File upload failed: " + error.message);

    }

};

module.exports = uploadToBunny;
