const UserProfile =
    require("../models/UserProfile");

const User =
    require("../models/User");


// ================= CREATE =================

exports.createUserProfile =
    async (req, res) => {

        try {

            const profile =
                await UserProfile.create({

                    ...req.body,

                    userId: req.user.id

                });


            res.status(201).json({

                success: true,

                data: profile

            });


        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };



// ================= GET ALL =================
// USER -> ONLY OWN DATA
// ADMIN -> ALL DATA


exports.getUserProfiles =
    async (req, res) => {


        try {


            let profiles;



            if (req.user.role === "admin") {


                profiles =
                    await UserProfile.find()
                        .populate(
                            "userId",
                            "name email phone role"
                        );


            }
            else {


                profiles =
                    await UserProfile.find({

                        userId: req.user.id

                    })
                        .populate(
                            "userId",
                            "name email phone"
                        );


            }



            res.status(200).json({

                success: true,

                data: profiles

            });



        }
        catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };



// ================= GET SINGLE =================
// USER -> OWN PROFILE
// ADMIN -> ANY PROFILE


exports.getSingleUserProfile =
    async (req, res) => {


        try {


            let profile;



            if (req.user.role === "admin") {


                profile =
                    await UserProfile.findById(
                        req.params.id
                    )
                        .populate(
                            "userId",
                            "name email phone role"
                        );


            }
            else {


                profile =
                    await UserProfile.findOne({

                        userId: req.user.id

                    })
                        .populate(
                            "userId",
                            "name email phone"
                        );


            }



            if (!profile) {


                return res.status(404).json({

                    success: false,

                    message: "Profile not found"

                });


            }



            res.status(200).json({

                success: true,

                data: profile

            });



        }
        catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };




// ================= UPDATE =================


exports.updateUserProfile =
    async (req, res) => {


        try {


            let profile;



            if (req.user.role === "admin") {


                profile =
                    await UserProfile.findByIdAndUpdate(

                        req.params.id,

                        req.body,

                        {
                            new: true
                        }

                    );


            }
            else {


                profile =
                    await UserProfile.findOneAndUpdate(


                        {
                            userId: req.user.id
                        },


                        req.body,


                        {
                            new: true
                        }


                    );


            }



            res.status(200).json({

                success: true,

                data: profile

            });



        }
        catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };




// ================= DELETE =================


exports.deleteUserProfile =
    async (req, res) => {


        try {


            if (req.user.role === "admin") {


                await UserProfile.findByIdAndDelete(
                    req.params.id
                );


            }
            else {


                await UserProfile.findOneAndDelete({

                    userId: req.user.id

                });


            }



            res.status(200).json({

                success: true,

                message: "Profile Deleted"

            });



        }
        catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };