const Reminder = require('../models/Reminder');

// 1. CREATE REMINDER
exports.createReminder = async (req, res) => {
  try {
    const { title, date, time, type, description } = req.body;
    const reminder = await Reminder.create({
      userId: req.user.id,
      message: title,
      remindAt: date,
      time: time || '09:00',
      type: type || 'other',
      description: description,
      status: 'pending'
    });

    res.status(201).json({ 
      reminder: {
        id: reminder.id,
        title: reminder.message,
        date: reminder.remindAt,
        time: reminder.time,
        type: reminder.type,
        description: reminder.description,
        status: reminder.status
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. GET REMINDERS
exports.getMyReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      where: { userId: req.user.id },
      attributes: [
        'id',
        ['message', 'title'],      
        ['remindAt', 'date'],      
        'time',
        'type',
        'description',             
        'status'
      ],
      order: [['remindAt', 'ASC']]
    });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. DELETE REMINDER (Fixed to use Sequelize)
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedCount = await Reminder.destroy({
      where: { id, userId }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. UPDATE REMINDER (For the Status Toggle)
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [updated] = await Reminder.update(
      { status },
      { where: { id, userId: req.user.id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};