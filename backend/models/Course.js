const TopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  name: { type: String, required: true },
  isComplete: { type: Boolean, default: false }
});

const ModuleSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  topics: [TopicSchema]
});

const WeeklySchema = new mongoose.Schema({
  weekId: { type: Number, required: true },
  modules: [ModuleSchema]
});

// Roadmap Schema
const RoadmapSchema = new mongoose.Schema(
  {
    roadmapId: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    roadmapData: [WeeklySchema]
  },
  { timestamps: true }