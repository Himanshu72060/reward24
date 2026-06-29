const User =
    require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");
const ReferralHistory =
    require("../models/ReferralHistory");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

// const { nanoid } =
//     require("nanoid");

const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet(
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
    8
);


// SIGNUP
exports.signup = async (
    req,
    res
) => {

    try {

        const {
            fullName,
            email,
            mobileNumber,
            password,
            confirmPassword,
            referralCode
        } = req.body;



        // VALIDATION
        if (
            !fullName ||
            !email ||
            !mobileNumber ||
            !password ||
            !confirmPassword
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }



        // PASSWORD CHECK
        if (
            password !==
            confirmPassword
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Passwords do not match"
            });
        }



        // CHECK USER
        const existingUser =
            await User.findOne({
                $or: [
                    { email },
                    { mobileNumber }
                ]
            });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                    "User already exists"
            });
        }



        // HASH PASSWORD
        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );




        // const myReferralCode =
        //     fullName
        //         .slice(0, 3)
        //         .toUpperCase() +
        //     nanoid(5);


        // ==============================
        // GENERATE UNIQUE REFERRAL CODE
        // ==============================

        let myReferralCode;

        let exists = true;

        while (exists) {

            myReferralCode = nanoid();

            exists = await User.findOne({

                myReferralCode

            });

        }


        // DEFAULT BONUS
        let signupCoins = 0;

       

        let referredBy = null;

        if (referralCode) {

            const referrerUser = await User.findOne({

                myReferralCode: referralCode

            });

            if (!referrerUser) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid Referral Code"

                });

            }

            referredBy = referrerUser._id;

            referrerUser.totalReferrals += 1;

            await referrerUser.save();

        }

        // CREATE USER
        // const user =
        //     await User.create({

        //         fullName,

        //         email,

        //         mobileNumber,

        //         password:
        //             hashedPassword,

        //         myReferralCode,

        //         referredBy:
        //             referralCode || "",

        //         coins:
        //             signupCoins

        //     });

        const user = await User.create({

            fullName,

            email,

            mobileNumber,

            password: hashedPassword,

            myReferralCode,

            referredBy,

            coins: signupCoins

        });



        // REFERRAL SYSTEM
        // if (referralCode) {

        //     const referrerUser =
        //         await User.findOne({
        //             myReferralCode:
        //                 referralCode
        //         });

        //     if (referrerUser) {

        //         // ADD COINS
        //         referrerUser.coins += 100;

        //         // TOTAL REFERRALS
        //         referrerUser.totalReferrals += 1;

        //         await referrerUser.save();



        //         // SAVE HISTORY
        //         await ReferralHistory.create({

        //             referrerUser:
        //                 referrerUser._id,

        //             newUser:
        //                 user._id,

        //             referralCode,

        //             rewardCoins: 100

        //         });
        //     }
        // }



        res.status(201).json({

            success: true,

            message:
                "Signup successful",

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });
    }
};



// LOGIN
exports.login = async (
    req,
    res
) => {

    try {

        const {
            email,
            password
        } = req.body;



        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password required"

            });
        }



        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "User not found"

            });
        }



        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid password"

            });
        }



        // JWT TOKEN
        // const token =
        //     jwt.sign(
        //         {
        //             id: user._id,
        //             name: user.fullName,
        //             profileImage: user.profileImage || ""
        //         },
        //         process.env.JWT_SECRET,
        //         {
        //             expiresIn: "7d"
        //         }
        //     );

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                name: user.fullName,
                profileImage: user.profileImage || ""
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            });



        res.status(200).json({

            success: true,

            message:
                "Login successful",

            token,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });
    }
};



// PROFILE
// exports.profile = async (
//     req,
//     res
// ) => {

//     try {

//         const user =
//             await User.findById(
//                 req.user.id
//             );

//         res.status(200).json({

//             success: true,

//             user

//         });

//     } catch (error) {

//         res.status(500).json({

//             success: false,

//             message:
//                 error.message

//         });
//     }
// };
// ==============================
// GET PROFILE
// ==============================

exports.profile = async (req, res) => {

    try {

        // const user = await User.findById(req.user.id)
        //     .select("-password");

        const user = await User.findById(req.user.id)
            .populate(
                "referredBy",
                "fullName myReferralCode"
            )
            .select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Get User Transactions
        const transactions = await CoinTransaction.find({
            userId: user._id
        });

        let totalCoins = 0;
        let pendingCoins = 0;
        let totalEarnedCoins = 0;
        let totalWithdrawnCoins = 0;

        transactions.forEach((transaction) => {

            const coins = Number(transaction.coins || 0);

            // Credit Transactions
            if (
                [
                    "reward",
                    "watch_ad",
                    "daily_checkin",
                    "spin",
                    "referral",
                    "bonus"
                ].includes(transaction.type)
            ) {

                totalEarnedCoins += coins;

                if (transaction.status === "pending") {

                    pendingCoins += coins;

                } else {

                    totalCoins += coins;

                }

            }

            // Withdraw Transactions
            if (
                transaction.type === "withdraw"
            ) {

                if (
                    transaction.status === "approved" ||
                    transaction.status === "completed"
                ) {

                    totalCoins -= coins;
                    totalWithdrawnCoins += coins;

                }

            }

        });

        if (totalCoins < 0) {
            totalCoins = 0;
        }

        res.status(200).json({

            success: true,

            message: "Profile fetched successfully",

            user: {

                _id: user._id,

                fullName: user.fullName,

                email: user.email,

                mobileNumber: user.mobileNumber,

                profileImage: user.profileImage,

                myReferralCode: user.myReferralCode,

                referredBy: user.referredBy,

                role: user.role,

                isBlocked: user.isBlocked,

                totalReferrals: user.totalReferrals,

                checkInStreak: user.checkInStreak,

                dailySpinCount: user.dailySpinCount,

                lastSpinDate: user.lastSpinDate,

                lastCheckInDate: user.lastCheckInDate,

                coins: totalCoins,

                pendingCoins,

                totalEarnedCoins,

                totalWithdrawnCoins,

                createdAt: user.createdAt,

                updatedAt: user.updatedAt

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// REFERRAL HISTORY
exports.referralHistory =
    async (
        req,
        res
    ) => {

        try {

            const history =
                await ReferralHistory
                    .find({
                        referrerUser:
                            req.user.id
                    })
                    .populate(
                        "newUser",
                        "fullName email"
                    );



            res.status(200).json({

                success: true,

                history

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });
        }
    };


// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "User Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// UPDATE PROFILE
exports.editProfile = async (req, res) => {
    try {

        const {
            fullName,
            profileImage,
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update Name
        if (fullName) {
            user.fullName = fullName;
        }

        // Update Image
        if (profileImage) {
            user.profileImage = profileImage;
        }

        // Password Change
        if (
            oldPassword ||
            newPassword ||
            confirmPassword
        ) {

            const isMatch =
                await bcrypt.compare(
                    oldPassword,
                    user.password
                );

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Old password is incorrect"
                });
            }

            if (
                newPassword !==
                confirmPassword
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Passwords do not match"
                });
            }

            user.password =
                await bcrypt.hash(
                    newPassword,
                    10
                );
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getMyReferral = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select(
            "fullName myReferralCode totalReferrals referralIncome"
        );

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        return res.status(200).json({

            success: true,

            data: {

                fullName: user.fullName,

                referralCode: user.myReferralCode,

                totalReferrals: user.totalReferrals,

                referralIncome: user.referralIncome

            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================
// MY REFERRED USERS
// ==============================

exports.getMyReferredUsers = async (req, res) => {

    try {

        const users = await User.find({

            referredBy: req.user.id

        })
        .select(
            "fullName email mobileNumber profileImage coins createdAt"
        )
        .sort({
            createdAt: -1
        });

        return res.status(200).json({

            success: true,

            totalReferrals: users.length,

            data: users

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};