const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  roadmapId: { type: String, ref: "Roadmap", required: true },
  courseName: {type: String},
  category: {type : String},
  duration: {type : Number},
  ramaining: {type : Number},

}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);