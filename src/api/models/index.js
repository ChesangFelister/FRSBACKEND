const User = require("./User");
const Document = require("./Document");
const Reminder = require("./Reminder");
const Payment = require("./Payment");
const Maintenance = require("./Maintenance");
const Property = require("./Property");
const Tenant = require("./Tenant");
// Associations
User.hasMany(Property, { foreignKey: "landlordId", as: "properties" });
Property.belongsTo(User, { foreignKey: "landlordId", as: "landlord" });

Property.hasMany(Document, { foreignKey: "propertyId", as: "documents" });
Document.belongsTo(Property, { foreignKey: "propertyId", as: "property" });

Property.hasMany(Tenant, { foreignKey: "propertyId", as: "tenants" });
Tenant.belongsTo(Property, { foreignKey: "propertyId", as: "property" });

User.hasMany(Tenant, { foreignKey: "userId", as: "tenancies" });
Tenant.belongsTo(User, { foreignKey: "userId", as: "tenant" });

Tenant.hasMany(Payment, { foreignKey: "tenantId", as: "payments" });
Payment.belongsTo(Tenant, { foreignKey: "tenantId", as: "tenant" });

Property.hasMany(Maintenance, { foreignKey: "propertyId", as: "maintenances" });
Maintenance.belongsTo(Property, { foreignKey: "propertyId", as: "property" });

module.exports = {
  User,
  Property,
  Document,
  Reminder,
  Payment,
  Maintenance,
  Tenant,
};
