// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config(); // load .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD), // make sure password is string
  port: Number(process.env.DB_PORT),         // ensure port is a number
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

module.exports = pool;
