const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all properties (admin & landlord)
router.get('/', authenticateToken, authorizeRoles('admin', 'landlord'), async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get properties for logged-in landlord
router.get('/mine', authenticateToken, authorizeRoles('landlord'), async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM properties WHERE landlord_id=$1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create property
router.post('/', authenticateToken, authorizeRoles('admin', 'landlord'), async (req, res) => {
  const { name, location, rent } = req.body;
  try {
    await db.query(
      'INSERT INTO properties (landlord_id, name, location, rent) VALUES ($1,$2,$3,$4)',
      [req.user.id, name, location, rent]
    );
    res.json({ message: 'Property added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete property
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'landlord'), async (req, res) => {
  try {
    await db.query('DELETE FROM properties WHERE id=$1', [req.params.id]);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
