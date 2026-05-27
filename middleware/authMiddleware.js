const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No Token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.admin = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};