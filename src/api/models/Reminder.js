const {DataTypes} = require('sequelize');
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
}, {
    timestamps: true,
    tableName: 'reminders',
});

module.exports = Reminder;