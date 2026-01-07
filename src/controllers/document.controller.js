const Document = require("../models/Document");

exports.upload = async (req, res) => {
  const { type, propertyId } = req.body;

  const doc = await Document.create({
    filename: req.file.filename,
    type,
    propertyId,
    uploadedBy: req.user.id
  });

  res.status(201).json(doc);
};
