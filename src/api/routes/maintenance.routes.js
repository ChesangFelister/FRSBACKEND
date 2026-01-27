const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

// Get properties for a specific landlord
router.get('/properties', auth, role('admin','landlord'), async (req, res) => {
    const landlordId = req.user.id;
    const result = await db.query(
        `SELECT * FROM properties WHERE landlord_id = $1`, [landlordId]
    );
    res.json(result.rows);
});

// Schedule maintenance for a property
router.post('/schedule', auth, role('admin','landlord'), async (req, res) => {
    const { propertyId, description, scheduled_date } = req.body;
    await db.query(
        'INSERT INTO maintenance_requests (property_id, description, scheduled_date, status) VALUES ($1, $2, $3, $4)',
        [propertyId, description, scheduled_date, 'scheduled']
    );
    res.json({ message: 'Maintenance scheduled successfully' });
});

// Get maintenance requests for a specific property
router.get('/property/:propertyId', auth, role('admin','landlord'), async (req, res) => {
    const { propertyId } = req.params;
    const result = await db.query(
        `SELECT * FROM maintenance_requests WHERE property_id = $1`, [propertyId]
    );
    res.json(result.rows);
});

module.exports = router;