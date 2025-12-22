const db = require('../middleware/config/db');

exports.createReminder = async (req, res) => {
  const { title, description, date, property_id } = req.body;
  const user_id = req.user.id;

  try {
    const result = await db.query(
      `INSERT INTO reminders (user_id, title, description, date, property_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, title, description, date, property_id || null]
    );
    res.json({ message: 'Reminder created', reminder: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyReminders = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await db.query(
      `SELECT * FROM reminders WHERE user_id = $1 ORDER BY date ASC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReminder = async (req, res) => {
  const reminderId = req.params.id;
  const user_id = req.user.id;

  try {
    const result = await db.query(
      `DELETE FROM reminders WHERE id = $1 AND user_id = $2 RETURNING *`,
      [reminderId, user_id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Reminder not found or not allowed' });
    res.json({ message: 'Reminder deleted', reminder: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
