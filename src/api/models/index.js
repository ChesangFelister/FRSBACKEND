const Property = require("./Property");
const Document = require("./Document");
const Tenant = require("./Tenant");
const Payment = require("./Payment");
const Maintenance = require("./Maintenance");
const User = require("./User");
const Reminder = require("./Reminder");
const sequelize = require("../config/db");

// Associations
// Reminder belongs to User
Reminder.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Reminder, { foreignKey: "userId" });

// Property belongs to User (landlord)
Property.belongsTo(User, { foreignKey: "landlordId", onDelete: "CASCADE" });
User.hasMany(Property, { foreignKey: "landlordId" });

// Documents & Maintenances belong to Property
Document.belongsTo(Property, { foreignKey: "propertyId", onDelete: "CASCADE" });
Property.hasMany(Document, { foreignKey: "propertyId" });

Maintenance.belongsTo(Property, { foreignKey: "propertyId", onDelete: "CASCADE" });
Property.hasMany(Maintenance, { foreignKey: "propertyId" });

// Tenants belong to Property
Tenant.belongsTo(Property, { foreignKey: "propertyId", onDelete: "CASCADE" });
Property.hasMany(Tenant, { foreignKey: "propertyId" });

// Payments belong to Tenant & Property
Payment.belongsTo(Tenant, { foreignKey: "tenantId", onDelete: "CASCADE" });
Tenant.hasMany(Payment, { foreignKey: "tenantId" });

Payment.belongsTo(Property, { foreignKey: "propertyId", onDelete: "CASCADE" });
Property.hasMany(Payment, { foreignKey: "propertyId" });

module.exports = {
  User,
  Property,
  Document,
  Tenant,
  Payment,
  Maintenance,
  Reminder,
};
