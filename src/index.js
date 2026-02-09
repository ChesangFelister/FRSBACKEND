require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./api/models/User");
const sequelize = require("./api/config/db");
const authRoutes = require("./api/routes/auth.routes");
const path = require("path");


require("./api/models"); 
require("./api/utils/reminderCron"); // Start the reminder cron job

const routes = require("./api/routes/index");


const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", routes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images from the correct path
app.use('/uploads', express.static('uploads'));
const { startReminderCron } = require("./api/utils/reminderCron");

startReminderCron(); // Start the cron job when the server starts


const PORT = process.env.PORT || 5000;

// CHANGE THIS LINE RIGHT NOW:
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced (Data will now PERSIST)");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Database sync failed:", err);
});
