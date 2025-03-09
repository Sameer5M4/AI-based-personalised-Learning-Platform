const express = require("express");
const mongoose = require("mongoose");
const Roadmap = require("../models/Roadmap"); // Ensure correct import
const Course = require("../models/Course")

const router = express.Router();

// Fetch roadmap by roadmapId
router.get("/:roadmapId", async (req, res) => {
    try {
        const reqRoadmapId = req.params.roadmapId;
        console.log(reqRoadmapId)
        // Ensure roadmapId is the correct type (String or Number based on schema)
        const roadmap = await Roadmap.findOne({
            roadmapId: reqRoadmapId
        });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found"
            });
        }

        res.status(200).json({
            success: true,
            roadmap
        });

    } catch (error) {
        console.error("Error fetching roadmap:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// Update isComplete for a specific topic using index-based access
router.put("/:roadmapId/week/:weekIndex/module/:moduleIndex/topic/:topicIndex", async (req, res) => {
    try {
        const {
            roadmapId,
            weekIndex,
            moduleIndex,
            topicIndex
        } = req.params;
        const {
            isComplete
        } = req.body;

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                error: "Invalid isComplete value"
            });
        }

        // Find the roadmap document
        const roadmap = await Roadmap.findOne({
            roadmapId
        });
        if (!roadmap) return res.status(404).json({
            error: "Roadmap not found"
        });

        // Validate indexes before updating
        if (
            !roadmap.roadmapData ?.[weekIndex] ||
            !roadmap.roadmapData[weekIndex].modules ?.[moduleIndex] ||
            !roadmap.roadmapData[weekIndex].modules[moduleIndex].topics ?.[topicIndex]
        ) {
            return res.status(400).json({
                error: "Invalid week, module, or topic index"
            });
        }

        // ✅ Toggle the isComplete field
        roadmap.roadmapData[weekIndex].modules[moduleIndex].topics[topicIndex].isComplete = !isComplete;

        roadmap.markModified(`roadmapData.${weekIndex}.modules.${moduleIndex}.topics.${topicIndex}`);

        // ✅ Save the updated roadmap
        await roadmap.save();

        return res.status(200).json({
            message: "Topic updated successfully",
            course: roadmap.roadmapData
        });

    } catch (error) {
        return res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
});

router.get("/:roadmapId/progress", async (req, res) => {
    try {
        const { roadmapId } = req.params;

        // Fetch roadmap from database
        const roadmap = await Roadmap.findOne({ roadmapId });

        if (!roadmap) {
            return res.status(404).json({ message: "Roadmap not found" });
        }

        // Fetch the associated course
        const course = await Course.findOne({ roadmapId });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        let totalTopics = 0;
        let completedTopics = 0;

        // Iterate through roadmapData 
        roadmap.roadmapData.forEach(week => {
            week.modules.forEach(module => {
                module.topics.forEach(topic => {
                    totalTopics++;
                    if (topic.isComplete) {
                        completedTopics++;
                    }
                });
            });
        });

        console.log(`Total Topics: ${totalTopics}, Completed Topics: ${completedTopics}`);

        // Calculate progress
        const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

        // ✅ Store progress in the `Course` model
        course.progress = progress.toFixed(1);

        // ✅ Save the updated course
        await course.save();

        return res.json({
            roadmapId: roadmap.roadmapId,
            progress: progress.toFixed(1),
        });

    } catch (error) {
        console.error("Error calculating roadmap progress:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;