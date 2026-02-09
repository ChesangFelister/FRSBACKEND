const { Property, PropertyImage } = require("../models");

exports.createProperty = async (req, res) => {
  try {
    const imagePaths = req.files?.map((file) => `uploads/${file.filename}`) || [];

    const property = await Property.create({
      name: req.body.name,
      location: req.body.location,
      price: Number(req.body.price),
      beds: Number(req.body.beds || 0),
      baths: Number(req.body.baths || 0),
      sqft: Number(req.body.sqft || 0),
      status: req.body.status || "Available",
      isBuilding: req.body.isBuilding === "true",
      unitCount: Number(req.body.unitCount || 1),
      landlordId: req.user.id, 
      image: imagePaths[0] || null, // Sets the "main" image
    });

    // 3. Save ALL images into the property_images table
    if (imagePaths.length > 0) {
      const imageRecords = imagePaths.map(path => ({
        propertyId: property.id,
        url: path
      }));
      await PropertyImage.bulkCreate(imageRecords);
    }

    // 4. Return the property with images included
    const fullProperty = await Property.findByPk(property.id, {
      include: [{ model: PropertyImage, as: 'images' }]
    });

    res.status(201).json(fullProperty);
  } catch (err) {
    console.error("CREATE PROPERTY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: { landlordId: req.user.id },
      include: [{ model: PropertyImage, as: 'images' }], // Critical for frontend
      order: [["createdAt", "DESC"]],
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({
      where: { id: req.params.id, landlordId: req.user.id },
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      where: { id: req.params.id, landlordId: req.user.id },
    });
    if (!property) return res.status(404).json({ message: "Property not found" });

    const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`) || [];
    if (imagePaths.length) req.body.image = imagePaths[0];

    await property.update(req.body);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      where: { id: req.params.id, landlordId: req.user.id },
    });
    if (!property) return res.status(404).json({ message: "Property not found" });

    await property.destroy();
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
