const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
  }
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  // {
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   dialect: "postgres",
  //   logging: false,
  // }
);

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   protocol: "postgres",
//   logging: false,
// });


sequelize.authenticate()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB error:", err));

module.exports = sequelize;
