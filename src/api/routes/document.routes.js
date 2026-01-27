const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');


// Upload a document for a propertyrouter.post('/upload', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId, documentType, documentUrl } = req.body;
    await db.query(
        'INSERT INTO property_documents (property_id, document_type, document_url) VALUES ($1, $2, $3)',
        [propertyId, documentType, documentUrl]
    );
    res.json({ message: 'Document uploaded successfully' });

// Get documents for a specific property
router.get('/property/:propertyId', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId } = req.params;
    const result = await db.query(
        `SELECT * FROM property_documents WHERE property_id = $1`, [propertyId]
    );  
    res.json(result.rows);
});
router.post('/upload', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId, documentType, documentUrl } = req.body;
    await db.query( 
        'INSERT INTO property_documents (property_id, document_type, document_url) VALUES ($1, $2, $3)',
        [propertyId, documentType, documentUrl]
    );
    res.json({ message: 'Document uploaded successfully' });
});
// Get documents for a specific property
router.get('/property/:propertyId', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId } = req.params;
    const result = await db.query(
        `SELECT * FROM property_documents WHERE property_id = $1`, [propertyId]
    );  
    res.json(result.rows);
});
// Upload a document for a property
router.post('/upload', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId, documentType, documentUrl } = req.body;
    await db.query(
        'INSERT INTO property_documents (property_id, document_type, document_url) VALUES ($1, $2, $3)',
        [propertyId, documentType, documentUrl]
    );
    res.json({ message: 'Document uploaded successfully' });
});
// Get documents for a specific property
router.get('/property/:propertyId', auth, role('admin','landlord','caretaker'), async (req, res) => {
    const { propertyId } = req.params;  
    const result = await db.query(
        `SELECT * FROM property_documents WHERE property_id = $1`, [propertyId]
    );
    res.json(result.rows);
});

module.exports = router;