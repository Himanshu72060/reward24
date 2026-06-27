// const TaskPartner =
//     require("../models/TaskPartner");

// // CREATE

// exports.createPartner =
//     async (req, res) => {

//         try {

//             const partner =
//                 await TaskPartner.create(
//                     req.body
//                 );

//             res.status(201).json(
//                 partner
//             );

//         } catch (error) {

//             res.status(500).json({
//                 message:
//                     error.message
//             });

//         }

//     };

// // GET ALL

// exports.getPartners =
//     async (req, res) => {

//         try {

//             const partners =
//                 await TaskPartner.find();

//             res.status(200).json(
//                 partners
//             );

//         } catch (error) {

//             res.status(500).json({
//                 message:
//                     error.message
//             });

//         }

//     };

// // UPDATE

// exports.updatePartner = async (req, res) => {

//     try {

//         const partner =
//             await TaskPartner.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 { new: true }
//             );

//         res.status(200).json(partner);

//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }
// };

// // DELETE

// exports.deletePartner = async (req, res) => {

//     try {

//         await TaskPartner.findByIdAndDelete(
//             req.params.id
//         );

//         res.status(200).json({
//             message: "Deleted Successfully"
//         });

//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }
// };


const TaskPartner = require("../models/TaskPartner");

const axios = require("axios");

const bunny = require("../config/bunny");


// ==========================
// BUNNY UPLOAD FUNCTION
// ==========================

const uploadToBunny = async (file, folder) => {

    const fileName =
        Date.now() + "-" + file.originalname;

    const uploadPath =
        folder + "/" + fileName;

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

// ==========================
// CREATE PARTNER
// ==========================

exports.createPartner = async (req, res) => {

    try {

        const {

            name,

            website,

            packageName,

            color,

            bonus,

            description

        } = req.body;


        let logo = "";


        if (req.file) {

            logo = await uploadToBunny(

                req.file,

                "task-partners"

            );

        }


        const partner = await TaskPartner.create({

            name,

            logo,

            website,

            packageName,

            color,

            bonus,

            description,

            totalTasks: 0,

            isActive: true

        });


        return res.status(201).json({

            success: true,

            message: "Task Partner created successfully",

            partner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// GET ALL PARTNERS
// ==========================

exports.getPartners = async (req, res) => {

    try {

        const partners = await TaskPartner.find({

            isActive: true

        }).sort({

            createdAt: -1

        });


        return res.status(200).json({

            success: true,

            count: partners.length,

            partners

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// GET SINGLE PARTNER
// ==========================

exports.getPartnerById = async (req, res) => {

    try {

        const partner = await TaskPartner.findById(req.params.id);

        if (!partner) {

            return res.status(404).json({

                success: false,

                message: "Partner not found"

            });

        }

        return res.status(200).json({

            success: true,

            partner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// UPDATE PARTNER
// ==========================

exports.updatePartner = async (req, res) => {

    try {

        const partner = await TaskPartner.findById(req.params.id);

        if (!partner) {

            return res.status(404).json({

                success: false,

                message: "Partner not found"

            });

        }


        if (req.file) {

            const logo = await uploadToBunny(

                req.file,

                "task-partners"

            );

            partner.logo = logo;

        }


        partner.name =
            req.body.name || partner.name;

        partner.website =
            req.body.website || partner.website;

        partner.packageName =
            req.body.packageName || partner.packageName;

        partner.color =
            req.body.color || partner.color;

        partner.bonus =
            req.body.bonus || partner.bonus;

        partner.description =
            req.body.description || partner.description;


        if (req.body.isActive !== undefined) {

            partner.isActive =
                req.body.isActive;

        }


        await partner.save();


        return res.status(200).json({

            success: true,

            message: "Partner updated successfully",

            partner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// DELETE PARTNER
// ==========================

exports.deletePartner = async (req, res) => {

    try {

        const partner = await TaskPartner.findById(req.params.id);

        if (!partner) {

            return res.status(404).json({

                success: false,

                message: "Partner not found"

            });

        }

        await TaskPartner.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Partner deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};