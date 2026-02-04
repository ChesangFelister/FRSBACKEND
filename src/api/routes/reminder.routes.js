const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');


// GET USER REMINDERS
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM reminder WHERE user_id=$1 ORDER BY date ASC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// CREATE REMINDER
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin','landlord','caretaker'),
  async (req, res) => {
    const { title, date, time, description, type } = req.body;

    try {
      const result = await db.query(
        `INSERT INTO reminder (user_id, title, date, time, description, type, status)
         VALUES ($1,$2,$3,$4,$5,$6,'pending') RETURNING *`,
        [req.user.id, title, date, time, description, type]
      );

      const reminder = result.rows[0];

      // ✅ Google Calendar link
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${date}T${time}/${date}T${time}&details=${encodeURIComponent(description)}`;

      res.json({ ...reminder, calendarUrl });

    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);


// TOGGLE COMPLETE
router.patch('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE reminder
       SET status = CASE WHEN status='completed' THEN 'pending' ELSE 'completed' END
       WHERE id=$1 AND user_id=$2 RETURNING *`,
      [req.params.id, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await db.query(
      'DELETE FROM reminder WHERE id=$1 AND user_id=$2',
      [req.params.id, req.user.id]
    );
    res.json({ message: 'Reminder deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
