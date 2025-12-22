const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const reminderController = require('../controllers/reminder.controller');

// Create a reminder (Admin, Landlord, Caretaker)
router.post('/', authenticateToken, authorizeRoles('admin', 'landlord', 'caretaker'), reminderController.createReminder);

// Get all reminders for logged-in user
router.get('/', authenticateToken, reminderController.getMyReminders);

// Delete reminder (Admin & owner)
router.delete('/:id', authenticateToken, reminderController.deleteReminder);

module.exports = router;
