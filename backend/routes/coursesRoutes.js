const express = require('express');
const mongoose = require("mongoose");
const Course = require("../models/Course"); // Ensure the correct path to the Course model
const Roadmap = require("../models/Roadmap");

const router = express.Router();

// Route to get all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().populate("roadmapId"); // Populate roadmap details if needed
        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});


router.get("/recent", async (req, res) => {
    try {
        const recentCourses = await Course.find()
            .populate("roadmapId")
            .sort({
                createdAt: -1
            }) // Sort by createdAt in descending order
            .limit(3); // Limit to top 3

        res.status(200).json({
            success: true,
            data: recentCourses
        });
    } catch (err) {
        console.error("Error fetching recent courses:", err);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
});


// Route to get a single course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findOne({
            courseId: req.params.id
        }).populate("roadmapId");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const {
            courseId,
            courseName,
            category,
            duration,
            remaining,
            roadmapData
        } = req.body;

        // Step 1: Create a new Roadmap without courseId
        const newRoadmap = new Roadmap({
            roadmapData
        });

        const savedRoadmap = await newRoadmap.save();

        // Step 2: Create a new Course linked to the roadmap
        const newCourse = new Course({
            courseId,
            roadmapId: savedRoadmap._id, // Linking the roadmap
            courseName,
            category,
            duration,
            remaining,
        });

        const savedCourse = await newCourse.save();

        // Step 3: Update the Roadmap with the Course ID
        savedRoadmap.courseId = savedCourse._id;
        await savedRoadmap.save();

        res.status(201).json({
            success: true,
            message: "Course and Roadmap added successfully",
            data: {
                course: savedCourse,
                roadmap: savedRoadmap
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});



// router.get("/:name", (req, res) => {
// const course = courses.find((c) => c.name === req.params.name);
// if (course) {
//     res.json(course);
// } else {
//     res.status(404).json({
//         message: "Course not found"
//     });
// }
// });

module.exports = router;