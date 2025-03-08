const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  roadmapId: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  roadmapData: {
    type: Map
  }
}, { timestamps: true });

module.exports = mongoose.model("Roadmap", RoadmapSchema);