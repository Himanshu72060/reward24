const uploadToBunny =
    require("../utils/bunnyUpload");

exports.uploadFile =
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({
                    success: false,
                    message:
                        "No file uploaded"
                });

            }

            const fileName =
                `${Date.now()}-${req.file.originalname}`;

            const fileUrl =
                await uploadToBunny(
                    req.file.buffer,
                    fileName
                );

            res.status(200).json({

                success: true,

                message:
                    "File Uploaded Successfully",

                url: fileUrl

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };