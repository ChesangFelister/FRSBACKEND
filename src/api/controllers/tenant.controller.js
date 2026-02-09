const { Tenant, Property, User } = require("../models");
const { Op } = require("sequelize");

// AUTO STATUS HELPER
const getStatus = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);

  if (end < today) return "overdue";

  const diffDays = (end - today) / (1000 * 60 * 60 * 24);
  if (diffDays < 30) return "moving-out";

  return "active";
};

// GET TENANTS
exports.getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Property, attributes: ["name"] },
        { model: User, attributes: ["fullName", "email", "phone"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formatted = tenants.map(t => ({
      id: t.id,
      name: t.User.fullName,
      email: t.User.email,
      phone: t.User.phone,
      property: t.Property.name,
      rent: t.rentAmount,
      leaseStart: t.leaseStartDate,
      leaseEnd: t.leaseEndDate,
      status: getStatus(t.leaseEndDate)
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load tenants" });
  }
};

// ADD TENANT
exports.addTenant = async (req, res) => {
  const tenant = await Tenant.create({ ...req.body, userId: req.user.id });
  res.status(201).json(tenant);
};
// GET SINGLE TENANT
exports.getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [Property, User]
    });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE TENANT
exports.updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ where: { id: req.params.id, userId: req.user.id }});
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    
    await tenant.update(req.body);
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteTenant = async (req, res) => {
  const tenant = await Tenant.findOne({ where: { id: req.params.id, userId: req.user.id }});
  if (!tenant) return res.status(404).json({ message: "Not found" });

  await tenant.destroy();
  res.json({ message: "Tenant deleted" });
};
