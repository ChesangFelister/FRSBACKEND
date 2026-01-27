const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    method: {
        type: DataTypes.ENUM('Credit Card', 'Bank Transfer', 'Cash', 'Check'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
        defaultValue: 'Pending',
        allowNull: false,
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'payments',
});

module.exports = Payment;