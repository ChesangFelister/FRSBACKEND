const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

// Process a payment
router.post('/', auth, role('tenant'), async (req, res) => {
    const {propertyId, amount, paymentDate } = req.body;
    await db.query(
        'INSERT INTO payments (tenant_id, property_id, amount, payment_date) VALUES ($1, $2, $3, $4)',
        [req.user.id, propertyId, amount, paymentDate]
    );
    res.json({ message: 'Payment processed successfully' });
});

//Admin and landlord can view payments
router.get('/', auth, role('admin','landlord'), async (req, res) => {
    const result = await db.query('SELECT * FROM payments');
    res.json(result.rows);
});

module.exports = router;

