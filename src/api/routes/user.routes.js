const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Admin
router.get('/admin/dashboard',
  authenticateToken,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({ message: 'Admin full access' });
  }
);

// Landlord
router.get('/landlord/dashboard',
  authenticateToken,
  authorizeRoles('landlord', 'admin'),
  (req, res) => {
    res.json({ message: 'Landlord dashboard' });
  }
);

// Tenant
router.get('/tenant/dashboard',
  authenticateToken,
  authorizeRoles('tenant', 'admin'),
  (req, res) => {
    res.json({ message: 'Tenant dashboard' });
  }
);

// Caretaker
router.get('/caretaker/dashboard',
  authenticateToken,
  authorizeRoles('caretaker', 'admin'),
  (req, res) => {
    res.json({ message: 'Caretaker dashboard' });
  }
);

module.exports = router;
