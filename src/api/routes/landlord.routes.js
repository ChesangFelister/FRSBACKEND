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
module.exports = router;