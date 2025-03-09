const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  roadmapId: { type: String },
  courseId: { type: String, ref: "Course" },
  roadmapData: {
    type: Array
  }
}, { timestamps: true });

module.exports = mongoose.model("Roadmap", RoadmapSchema); 