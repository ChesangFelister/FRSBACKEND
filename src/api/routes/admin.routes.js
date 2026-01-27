const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');



// Get all users (admin only)
router.get('/users', auth, role('admin'), async (req, res) => {
    const result = await db.query('SELECT id, username, role FROM users');
    res.json(result.rows);
});
//view all properties
router.get('/properties', auth, role('admin'), async (req, res) => {
    const result = await db.query('SELECT * FROM properties');
    res.json(result.rows);
});
//view all tenants
router.get('/tenants', auth, role('admin'), async (req, res) => {
    const result = await db.query('SELECT * FROM tenants');
    res.json(result.rows);
});
//view all landlords
router.get('/landlords', auth, role('admin'), async (req, res) => { 
    const result = await db.query('SELECT * FROM landlords');
    res.json(result.rows);
});
//view all maintenance requests
router.get('/maintenance-requests', auth, role('admin'), async (req, res) => {
    const result = await db.query('SELECT * FROM maintenance_requests');
    res.json(result.rows);
});

// Create a new user (admin only)
router.post('/create-user', auth, role('admin'), async (req, res) => {
    const { username, password, role: userRole } = req.body;
    await db.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', 
        [username, password, userRole]
    );
    res.json({ message: 'User created successfully' });
});
// Update user role (admin only)
router.put('/user/:id/role', auth, role('admin'), async (req, res) => {
    const { id } = req.params;
    const { role: newRole } = req.body;
    await db.query('UPDATE users SET role = $1 WHERE id = $2', [newRole, id]);
    res.json({ message: 'User role updated successfully' });
});
// Delete a user (admin only)
router.delete('/user/:id', auth, role('admin'), async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;