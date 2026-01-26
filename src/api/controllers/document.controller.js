const {Document} = require("../models");
exports.uploadDocument = async (req, res) => {
  const { type, propertyId } = req.body;

  const doc = await Document.create({
    filename: req.file.filename,
    type,
    propertyId,
    uploadedBy: req.user.id
  });

  res.status(201).json(doc);
};

exports.getDocumentsByProperty = async (req, res) => {
  const documents = await Document.findAll({
    where: { propertyId: req.params.propertyId }
  });
  res.json(documents);
};

exports.deleteDocument = async (req, res) => {
  const document = await Document.findOne({
    where: { id: req.params.id }
  });  
  if (!document) {
    return res.status(404).json({ message: 'Document not found' });
  }

  await document.destroy();
  res.json({ message: 'Document deleted successfully' });
};
