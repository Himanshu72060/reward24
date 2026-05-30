const fs =
    require("fs");

const FeaturedTaskBanner =
    require(
        "../models/FeaturedTaskBanner"
    );

const uploadToBunny =
    require(
        "../utils/bunnyUpload"
    );

exports.createBanner =
    async (
        req,
        res
    ) => {

        try {

            let backgroundImageUrl =
                "";

            let taskImageUrl =
                "";

            if (
                req.files
                    ?.backgroundImage
            ) {

                const file =
                    req.files
                        .backgroundImage[0];

                backgroundImageUrl =
                    await uploadToBunny(
                        file.path,
                        Date.now() +
                        "-" +
                        file.originalname
                    );

                fs.unlinkSync(
                    file.path
                );
            }

            if (
                req.files
                    ?.taskImage
            ) {

                const file =
                    req.files
                        .taskImage[0];

                taskImageUrl =
                    await uploadToBunny(
                        file.path,
                        Date.now() +
                        "-" +
                        file.originalname
                    );

                fs.unlinkSync(
                    file.path
                );
            }

            const banner =
                await FeaturedTaskBanner.create(
                    {
                        tagText:
                            req.body
                                .tagText,

                        title:
                            req.body
                                .title,

                        subtitle:
                            req.body
                                .subtitle,

                        backgroundImageUrl,

                        taskImageUrl,

                        startColorHex:
                            req.body
                                .startColorHex,

                        endColorHex:
                            req.body
                                .endColorHex,

                        tagColorHex:
                            req.body
                                .tagColorHex,

                        buttonText:
                            req.body
                                .buttonText
                    }
                );

            res.status(201)
                .json({
                    success: true,
                    data: banner
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };