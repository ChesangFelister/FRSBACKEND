const {Maintenance} = require('../models');

exports.createMaintenanceRequest = async (req, res) => {
    const maintenanceRequest = await Maintenance.create({ ...req.body });
    res.status(201).json(maintenanceRequest);
};

exports.getMaintenanceRequests = async (req, res) => {
    const maintenanceRequests = await Maintenance.findAll();
    res.json(maintenanceRequests);
};

exports.getMaintenanceRequestById = async (req, res) => {
    const maintenanceRequest = await Maintenance.findOne({ where: { id: req.params.id } }); 
    if (!maintenanceRequest) {
        return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.json(maintenanceRequest);
};

exports.updateMaintenanceRequest = async (req, res) => {
    const maintenanceRequest = await Maintenance.findOne({ where: { id: req.params.id } });
    if (!maintenanceRequest) {
        return res.status(404).json({ message: 'Maintenance request not found' });
    }      
    await maintenanceRequest.update(req.body);
    res.json(maintenanceRequest);
}

exports.deleteMaintenanceRequest = async (req, res) => {
    const maintenanceRequest = await Maintenance.findOne({ where: { id: req.params.id } });
    if (!maintenanceRequest) {
        return res.status(404).json({ message: 'Maintenance request not found' });
    }
    await maintenanceRequest.destroy();
    res.json({ message: 'Maintenance request deleted successfully' });
};
