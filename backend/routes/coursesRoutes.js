const express = require('express');
const mongoose = require("mongoose");
const Course = require("../models/Course"); // Ensure the correct path to the Course model
const Roadmap = require("../models/Roadmap");

const router = express.Router();

// Route to get all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find(); // Populate roadmap details if needed
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
router.get("/:courseId", async (req, res) => {
    try {
        const course = await Course.findOne({
            courseId: req.params.courseId
        }); 

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
        console.log("Received Request Body:", req.body);

        const { courseId, courseName, category, duration, remaining,roadmapId, roadmapData } = req.body;

        if (!roadmapData || !Array.isArray(roadmapData)) {
            return res.status(400).json({ success: false, message: "Invalid roadmap data format" });
        }

        // Step 1: Create a new Roadmap
        const newRoadmap = new Roadmap({ courseId, roadmapId, roadmapData });
        const savedRoadmap = await newRoadmap.save();
        
        console.log("Saved Roadmap:", savedRoadmap);

        // Step 2: Create a new Course linked to the roadmap
        const newCourse = new Course({
            courseId, // Generate ID if missing
            roadmapId, // Linking the roadmap
            courseName,
            category,
            duration,
            remaining,
        });
 
        const savedCourse = await newCourse.save();
        console.log("Saved Course:", savedCourse);

        res.status(201).json({
            success: true,
            message: "Course and Roadmap added successfully",
            data: { course: savedCourse, roadmap: savedRoadmap }
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
            details: error.errors || null
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