const Property = require("./Property");
const Document = require("./Document");
const Tenant = require("./Tenant");
const Payment = require("./Payment");
const Maintenance = require("./Maintenance");
const User = require("./User");
const Reminder = require("./Reminder");
const PropertyImage = require("./PropertyImage");

// ---------------- USERS ----------------
User.hasMany(Property, { foreignKey: "landlordId" });
Property.belongsTo(User, { foreignKey: "landlordId" });

// 🔥 TENANT USER ACCOUNT LINK
User.hasMany(Tenant, { foreignKey: "userId" });
Tenant.belongsTo(User, { foreignKey: "userId" });

// ---------------- PROPERTY ----------------
Property.hasMany(Document, { foreignKey: "propertyId" });
Document.belongsTo(Property, { foreignKey: "propertyId", as: "documents" });
Property.hasMany(PropertyImage, { foreignKey: "propertyId",as: "images" });
PropertyImage.belongsTo(Property, { foreignKey: "propertyId",as: "property" });
Property.hasMany(Maintenance, { foreignKey: "propertyId" });
Maintenance.belongsTo(Property, { foreignKey: "propertyId" });

Property.hasMany(Tenant, { foreignKey: "propertyId" });
Tenant.belongsTo(Property, { foreignKey: "propertyId" });

// ---------------- PAYMENTS ----------------
Tenant.hasMany(Payment, { foreignKey: "tenantId" });
Payment.belongsTo(Tenant, { foreignKey: "tenantId" });

Property.hasMany(Payment, { foreignKey: "propertyId" });
Payment.belongsTo(Property, { foreignKey: "propertyId" });

// ---------------- REMINDERS ----------------
User.hasMany(Reminder, { foreignKey: "userId" });
Reminder.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Property,
  PropertyImage,
  Document,
  Tenant,
  Payment,
  Maintenance,
  Reminder,
};
