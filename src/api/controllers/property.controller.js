const {Property} = require('../models');
const db = require('../config/db');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');
const upload = require('../middleware/upload'); // multer

// router.post("/", verifyToken, upload.array("images", 10), propertyController.createProperty);

exports.createProperty = async (req, res) => {
   try {
    const { name, location, price } = req.body;
    const result = await db.query(
      `INSERT INTO properties (landlord_id,name, location, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, name, location, price]
    );
    const property = result.rows[0];
    if (req.files?.length) {
        for (const file of req.files) {
            await db.query(
                `INSERT INTO property_images (property_id, image_url)
                 VALUES ($1, $2)`,
                [property.id, `/uploads/${file.filename}`]
            );
        }
    }
    res.status(201).json(property);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
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