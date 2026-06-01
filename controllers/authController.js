const User =
    require("../models/User");

const ReferralHistory =
    require("../models/ReferralHistory");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

const { nanoid } =
    require("nanoid");



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



        // GENERATE REFERRAL CODE
        const myReferralCode =
            fullName
                .slice(0, 3)
                .toUpperCase() +
            nanoid(5);



        // DEFAULT BONUS
        let signupCoins = 50;



        // CREATE USER
        const user =
            await User.create({

                fullName,

                email,

                mobileNumber,

                password:
                    hashedPassword,

                myReferralCode,

                referredBy:
                    referralCode || "",

                coins:
                    signupCoins

            });



        // REFERRAL SYSTEM
        if (referralCode) {

            const referrerUser =
                await User.findOne({
                    myReferralCode:
                        referralCode
                });

            if (referrerUser) {

                // ADD COINS
                referrerUser.coins += 100;

                // TOTAL REFERRALS
                referrerUser.totalReferrals += 1;

                await referrerUser.save();



                // SAVE HISTORY
                await ReferralHistory.create({

                    referrerUser:
                        referrerUser._id,

                    newUser:
                        user._id,

                    referralCode,

                    rewardCoins: 100

                });
            }
        }



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
        const token =
            jwt.sign(
                {
                    id: user._id,
                    name: user.fullName,
                    profileImage: user.profileImage || ""
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );



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
exports.profile = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.user.id
            );

        res.status(200).json({

            success: true,

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