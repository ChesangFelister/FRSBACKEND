const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    totalUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    landlordId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'properties',
});

module.exports = Property;