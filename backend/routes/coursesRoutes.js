const express = require('express');
const router = express.Router();

const courses = [{
    id: 1,
    name: "web-design-masterclass",
    title: "Web Design Masterclass",
    instructor: "Arlene Watson",
    category: "Development",
    tasks: 20,
    progress: 70,
    activeDays: 15,
    remainingDays: 10,
},
{
    id: 2,
    name: "google-ads-analytics",
    title: "Google Ads & Analytics",
    instructor: "Arlene Watson",
    category: "Marketing",
    tasks: 16,
    progress: 50,
    activeDays: 12,
    remainingDays: 8,
},
{
    id: 3,
    name: "react-redux-mastery",
    title: "React & Redux Mastery",
    instructor: "John Doe",
    category: "Development",
    tasks: 25,
    progress: 85,
    activeDays: 18,
    remainingDays: 5,
},
{
    id: 4,
    name: "machine-learning-ai",
    title: "Machine Learning & AI",
    instructor: "Arlene Watson",
    category: "Marketing",
    tasks: 16,
    progress: 50,
    activeDays: 12,
    remainingDays: 8,
},
{
    id: 5,
    name: "full-stack-development",
    title: "Full Stack Development",
    instructor: "John Doe",
    category: "Development",
    tasks: 25,
    progress: 85,
    activeDays: 18,
    remainingDays: 5,
}
];

router.get("/", (req, res) => {
res.json(courses);
});

router.get("/recent", (req, res) => {
const recentCourses = [...courses]
    .sort((a, b) => b.progress - a.progress) // Sort by progress (highest first)
    .slice(0, 3); // Get the top 3
res.json(recentCourses);
});

router.get("/:name", (req, res) => {
const course = courses.find((c) => c.name === req.params.name);
if (course) {
    res.json(course);
} else {
    res.status(404).json({
        message: "Course not found"
    });
}
});

module.exports = router;