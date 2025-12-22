const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');
const router = express.Router();
// Get all properties
router.get('/', auth, role('admin','landlord'),async (req, res) => {
    const {name, location,rent} = req.body;
    const landlordId = req.user.role === 'admin' ? req.user.id : req.user.id;
    const result = await db.query('INSERT INTO properties (name, location, rent, landlord_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, location, rent, landlordId]);
    res.json(result.rows[0]);
});
//view property 
router.get('/', auth, async (req, res) => {
    const result = await db.query('SELECT * FROM properties');
    res.json(result.rows);
});
module.exports = router;
