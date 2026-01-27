const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all reminders for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reminders WHERE user_id=$1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a reminder
router.post('/', authenticateToken, authorizeRoles('admin','landlord','caretaker'), async (req, res) => {
  const { title, date, time, description } = req.body;
  try {
    await db.query(
      'INSERT INTO reminders (user_id, title, date, time, description) VALUES ($1,$2,$3,$4,$5)',
      [req.user.id, title, date, time, description]
    );
    res.json({ message: 'Reminder created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a reminder
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM reminders WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
    res.json({ message: 'Reminder deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
