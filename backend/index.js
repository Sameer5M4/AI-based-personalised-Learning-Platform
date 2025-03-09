require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const coursesRoutes = require('./routes/coursesRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/roadmap', roadmapRoutes);

// ✅ Start Server
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
