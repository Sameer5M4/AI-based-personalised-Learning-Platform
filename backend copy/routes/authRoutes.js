const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                msg: "Passwords do not match"
            });
        }

        // Check if user already exists
        let user = await User.findOne({
            email
        });
        if (user) return res.status(400).json({
            msg: "User already exists"
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user with hashed password
        user = new User({
            name,
            email,
            password: hashedPassword,
            phone: '',
            address: '',
            bio: '',
            enrolledCourses : [],
            image : 'profileimg.png',
        });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Respond with token and user ID
        res.status(201).json({
            msg: "User registered successfully",
            token,
            userId: user._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Check if user exists
        const user = await User.findOne({
            email
        });
        if (!user) return res.status(400).json({
            msg: "User not found!"
        });

        // Validate password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid credentials!"
            });
        }

        // Generate JWT Token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        // Send back token and user ID
        res.json({
            token,
            userId: user._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
});


module.exports = router;