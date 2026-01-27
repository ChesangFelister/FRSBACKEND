const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Maintenance = sequelize.define('Maintenance', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,

    },
    propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    unitNumber: {
        type: DataTypes.STRING,
        allowNull: false,   
    },
    issueDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        defaultValue: 'Pending',
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'maintenances',
});

module.exports = Maintenance;