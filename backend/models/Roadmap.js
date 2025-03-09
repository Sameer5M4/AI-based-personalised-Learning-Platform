const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema(
  {
    roadmapId: { type: String, required: true, unique: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    roadmapData: { type: Array, required: true } // Changed to an array
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", RoadmapSchema);
module.exports = Roadmap;
module.exports = mongoose.model("Roadmap", RoadmapSchema);
