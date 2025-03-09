const express = require("express");
const Roadmap = require("../models/Roadmap"); // Ensure correct import

const router = express.Router();

// Fetch roadmap by roadmapId
router.get("/:roadmapId", async (req, res) => {
    try {
        const reqRoadmapId = req.params.roadmapId; 
        console.log(reqRoadmapId)
        // Ensure roadmapId is the correct type (String or Number based on schema)
        const roadmap = await Roadmap.findOne({ roadmapId:reqRoadmapId }); 

        if (!roadmap) {
            return res.status(404).json({ success: false, message: "Roadmap not found" });
        }

        res.status(200).json({ success: true, roadmap });

    } catch (error) {
        console.error("Error fetching roadmap:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

module.exports = router;
 