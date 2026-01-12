// src/api/controllers/auth.controller.js
const pool = require('../config/db'); // adjust to your path
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    // Check if email already exists
    const emailCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const result = await pool.query(
      'INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, fullname, email, role',
      [fullName, email, hashedPassword, role]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    res.status(500).json({
      message: 'Registration failed. Please try again later.',
      error: error.message,
    });
  }
};
