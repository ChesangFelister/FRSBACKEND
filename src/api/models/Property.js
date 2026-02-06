const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Property = sequelize.define(
  "Property",
  {
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

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    beds: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    baths: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    sqft: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Available",
    },

    isBuilding: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    unitCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "totalUnits",
      defaultValue: 1,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    landlordId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "properties",
    timestamps: true,
  }
);

module.exports = Property;
