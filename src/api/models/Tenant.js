const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Tenant = sequelize.define('Tenant', {
     id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    unitNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        
    },
    leaseStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    leaseEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    tableName: 'tenants',
});

module.exports = Tenant;
  
