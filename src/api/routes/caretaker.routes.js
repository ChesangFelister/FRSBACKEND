const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');


// Get caretakers for a specific property
router.get('/property/:propertyId', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId } = req.params;
    const result = await db.query(
        `SELECT c.* FROM caretakers c
         JOIN property_caretakers pc ON c.id = pc.caretaker_id
         WHERE pc.property_id = $1`, [propertyId]
    );  
    res.json(result.rows);
});
// Assign a caretaker to a property
router.post('/assign', auth, role('admin','landlord'), async (req, res) => {
    const { caretakerId, propertyId } = req.body;
    await db.query(
        'INSERT INTO property_caretakers (property_id, caretaker_id) VALUES ($1, $2)',
        [propertyId, caretakerId]
    );  
    res.json({ message: 'Caretaker assigned to property successfully' });
});

module.exports = router;