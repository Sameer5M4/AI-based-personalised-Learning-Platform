const express = require('express');
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
// 🔹 Multer Storage Configuration
const storage = multer.diskStorage({
    destination: "uploads/", // Save images in the "uploads" folder
    filename: async (req, file, cb) => {
        try {
            const userId = req.params.id;
            const ext = path.extname(file.originalname); // Get file extension
            const filename = `${userId}-${Date.now()}${ext}`; // Format: userID-timestamp.extension

            // Optional: Delete old profile picture if exists
            const user = await User.findById(userId);
            if (user && user.image) {
                const oldImagePath = path.join(__dirname, user.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Delete old image
                }
            }

            cb(null, filename);
        } catch (error) {
            cb(error);
        }
    },
});


const upload = multer({
    storage
});

// Upload image route
// Upload Profile Image
router.post("/:id/upload", upload.single("image"), async (req, res) => {
    try {
        const imageUrl = `/uploads/${req.file.filename}`;

        // Update user profile with new image URL
        const user = await User.findByIdAndUpdate(req.params.id, {
            image: imageUrl
        }, {
            new: true
        });

        res.json({
            imageUrl
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Get user profile by userId
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({
                _id: req.params.userId
            },
            "name email phone address bio image" // Select only these fields
        );
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});


// Update user profile by userId
router.put("/:userId", async (req, res) => {
    try {
        let user = await User.findOne({
            _id: req.params.userId
        });
        if (!user) {
            user = new User({
                userId: req.params.userId,
                ...req.body
            });
        } else {
            Object.assign(user, req.body);
        }
        await user.save();
        res.json({
            message: "Profile updated successfully",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update profile"
        });
    }
});


module.exports = router;