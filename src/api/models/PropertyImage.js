const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PropertyImage = sequelize.define("PropertyImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  propertyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Stores the relative path: uploads/filename.jpg"
  },
}, {
  tableName: "property_images", // Matches your Postgres table name
  timestamps: true,
});

module.exports = PropertyImage;