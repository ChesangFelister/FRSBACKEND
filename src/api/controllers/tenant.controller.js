const {Tenant} = require('../models');

exports.addTenant = async (req, res) => {
    const tenant = await Tenant.create({ ...req.body, userId: req.user.id });
    res.status(201).json(tenant);
};

exports.getTenants = async (req, res) => {
    const tenants = await Tenant.findAll({ where: { userId: req.user.id } });
    res.json(tenants);
};
exports.getTenantById = async (req, res) => {
    const tenant = await Tenant.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
};

exports.updateTenant = async (req, res) => {
    const tenant = await Tenant.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
    }
    await tenant.update(req.body);
    res.json(tenant);
}

exports.deleteTenant = async (req, res) => {
    const tenant = await Tenant.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
    }
    await tenant.destroy();
    res.json({ message: 'Tenant deleted successfully' });
};

