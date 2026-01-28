const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/roles');
const upload = require('../middleware/upload');
const propertyController = require('../controllers/property.controller');

router.post('/', auth, role('admin','landlord','caretaker'), 
upload.array('images',10), propertyController.createProperty);

router.get('/', auth, role('admin','landlord','caretaker'), propertyController.getAllProperties);
router.get('/mine', auth, role('landlord'), propertyController.getMyProperties);
router.get('/:id', auth, propertyController.getPropertyById);
router.put('/:id', auth, role('landlord'), upload.array('images',10), propertyController.updateProperty);
router.delete('/:id', auth, role('landlord'), propertyController.deleteProperty);

module.exports = router;
