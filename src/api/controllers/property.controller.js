const {Property} = require('../models');

exports.createProperty = async (req, res) => {
    const property = await Property.create({ ...req.body, landlordId: req.user.id });
    res.status(201).json(property);
};

exports.getProperties = async (req, res) => {
    const properties = await Property.findAll({ where: { landlordId: req.user.id } });
    res.json(properties);
};
exports.getPropertyById = async (req, res) => {
    const property = await Property.findOne({ where: { id: req.params.id, landlordId: req.user.id } }); 
    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
};
exports.updateProperty = async (req, res) => {
    const property = await Property.findOne({ where: { id: req.params.id, landlordId: req.user.id } });
    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
    }   
    await property.update(req.body);
    res.json(property);
};
exports.deleteProperty = async (req, res) => {
    const property = await Property.findOne({ where: { id: req.params.id, landlordId: req.user.id } }); 
    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
    }   
    await property.destroy();
    res.json({ message: 'Property deleted successfully' });
};