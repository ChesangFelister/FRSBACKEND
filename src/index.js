require("dotenv").config();
const express = require("express");
const cors = require("cors");

const User = require("./api/models/User");
const sequelize = require("./api/config/db");
const authRoutes = require("./api/routes/auth.routes");

// Import all models to establish associations
require("./api/models"); 

// This will load Property, Reminder, Document, and any other models
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


const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
