const PartnerDetail =
    require(
        "../models/PartnerDetail"
    );

// CREATE

exports.createPartnerDetail =
    async (req, res) => {

        try {

            const detail =
                await PartnerDetail.create(
                    req.body
                );

            res.status(201).json(
                detail
            );

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// GET BY PARTNER ID

exports.getPartnerDetail =
    async (req, res) => {

        try {

            const detail =
                await PartnerDetail.findOne({

                    partnerId:
                        req.params.partnerId

                });

            res.status(200).json(
                detail
            );

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };