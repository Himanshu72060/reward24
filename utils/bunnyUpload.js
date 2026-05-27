// utils/bunnyUpload.js

const axios = require("axios");

// ================= BUNNY UPLOAD FUNCTION =================

const uploadToBunny = async (
    fileBuffer,
    fileName
) => {

    try {

        // STORAGE ZONE NAME
        const storageZone =
            process.env.BUNNY_STORAGE_ZONE;

        // ACCESS KEY
        const accessKey =
            process.env.BUNNY_ACCESS_KEY;

        // PULL ZONE URL
        const pullZone =
            process.env.BUNNY_PULL_ZONE;

        // FILE UPLOAD URL
        const uploadUrl =
            `https://storage.bunnycdn.com/${storageZone}/${fileName}`;

        // UPLOAD FILE TO BUNNY.NET
        await axios.put(
            uploadUrl,
            fileBuffer,
            {
                headers: {
                    AccessKey:
                        accessKey,
                    "Content-Type":
                        "application/octet-stream"
                },

                maxContentLength:
                    Infinity,

                maxBodyLength:
                    Infinity
            }
        );

        // RETURN FILE URL
        return `${pullZone}/${fileName}`;

    } catch (error) {

        console.log(
            "Bunny Upload Error =>",
            error.message
        );

        throw new Error(
            "File upload failed"
        );

    }

};

module.exports =
    uploadToBunny;