const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reminder = sequelize.define('Reminder', {
    id: {
        type: DataTypes.UUID,   
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    remindAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,   
        defaultValue: '09:00',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,   
        defaultValue: 'other',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // matches your frontend "pending" | "completed"
    }
}, {
    timestamps: true,
    tableName: 'reminders',
});

module.exports = Reminder;