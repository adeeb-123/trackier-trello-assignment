const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req, res, next) => {

    try {
        const token = req.cookies.token
            || req.body.token
            || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is not Available"
            });
        }

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            });
        }
        next();

    } catch (error) {
        console.log('auth error', error)
        return res.status(500).json({
            success: false,
            message: "Authentication Failed"
        });
    }
}
