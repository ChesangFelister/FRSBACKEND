require("dotenv").config();
const express = require("express");
const cors = require("cors");

const User = require("./api/models/User");
const sequelize = require("./api/config/db");
const authRoutes = require("./api/routes/auth.routes");

require("./api/models"); 
require("./api/utils/reminderCron"); // Start the reminder cron job

const routes = require("./api/routes/index");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", routes);
app.use('/uploads', express.static('uploads'));
const { startReminderCron } = require("./api/utils/reminderCron");

startReminderCron(); // Start the cron job when the server starts


const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
