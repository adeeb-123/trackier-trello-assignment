const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body
        if (!userName || !password || !confirmPassword || !email) {
            return res.status(403).json({
                success: false,
                message: "All Fields are Required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password does not match , Please try again",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is Already Registered",
            });
        }

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            userImage: `https://api.dicebear.com/5.x/initials/svg?seed=${userName}`
        })

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        console.log("error" , error)
        return res.status(500).json({
            success: false,
            message: "User Cannot be Registered , Please Try Again",
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required , Please try again",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered , Please Sign Up first",
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                sameSite: 'None',
                secure: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password Is Incorrect",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login Failure ,Pleaase Try Again",
        });
    }
}