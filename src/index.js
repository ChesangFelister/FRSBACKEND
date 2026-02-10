require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./api/config/db");
const authRoutes = require("./api/routes/auth.routes");

require("./api/models"); 
const routes = require("./api/routes/index");
const { startReminderCron } = require("./api/utils/reminderCron");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173","https://flashrentsolution.netlify.app"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "api", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api", routes);

startReminderCron(); 

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  // This log helps you verify the path in your terminal:
  console.log("📂 Static files served from:", path.join(__dirname, "api", "uploads"));
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Database sync failed:", err);
});