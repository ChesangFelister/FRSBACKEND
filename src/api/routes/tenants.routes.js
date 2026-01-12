const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

// Create a new tenant
router.post('/assign', auth, role('admin','landlord'), async (req, res) => {
    const { tenantId, propertyId,start_date } = req.body;
    await db.query('INSERT INTO tenant_properties (tenant_id, property_id, start_date) VALUES ($1, $2, $3)', [tenantId, propertyId, start_date]);

    res.json({ message: 'Tenant assigned to property successfully' });
});

// // Get all tenants
// router.get('/', auth, role('admin','landlord'), async (req, res) => {
//     const result = await db.query('SELECT * FROM tenants');
//     res.json(result.rows);
// });

// // Get tenants for a specific property
// router.get('/property/:propertyId', auth, role('admin','landlord'), async (req, res) => {
//     const { propertyId } = req.params;
//     const result = await db.query(
//         `SELECT t.* FROM tenants t
//          JOIN tenant_properties tp ON t.id = tp.tenant_id
//          WHERE tp.property_id = $1`, [propertyId]
//     );
//     res.json(result.rows);
// });
module.exports = router;