const jwt = require("jsonwebtoken");

module.exports = async (
    req,
    res,
    next
) => {

    try {

        let token =
            req.headers.authorization;

        // CHECK TOKEN
        if (!token) {

            return res.status(401).json({
                success: false,
                message: "No Token Found"
            });
        }



        // REMOVE BEARER
        if (
            token.startsWith("Bearer ")
        ) {

            token =
                token.split(" ")[1];
        }



        // VERIFY TOKEN

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );




        // SAVE USER DATA
        req.user = decoded;



        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};