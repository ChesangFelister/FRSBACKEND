require("dotenv").config();
const express = require("express");
const sequelize = require("./api/config/db");

// Import all models to establish associations
require("./api/models"); 

// This will load Property, Reminder, Document, and any other models
const routes = require("./api/routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
