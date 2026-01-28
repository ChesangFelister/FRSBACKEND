const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');
const upload = require('../middleware/upload'); 

// Upload a document for a property

router.post(
  '/',
  auth,
  role('admin', 'landlord', 'caretaker'),
  upload.single('document'), 
  async (req, res) => {
    try {
      const { propertyId, type } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const documentUrl = `/uploads/${req.file.filename}`;

      await db.query(
        `INSERT INTO property_documents (property_id, document_type, document_url)
         VALUES ($1, $2, $3)`,
        [propertyId, type, documentUrl]
      );

      res.status(201).json({ message: 'Document uploaded successfully', documentUrl });
    } catch (err) {
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  }
);

// Get documents for a specific property
router.get(
  '/property/:propertyId',
  auth,
  role('admin', 'landlord', 'caretaker'),
  async (req, res) => {
    try {
      const { propertyId } = req.params;

      const result = await db.query(
        `SELECT * FROM property_documents WHERE property_id = $1`,
        [propertyId]
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching documents' });
    }
  }
);

module.exports = router;
