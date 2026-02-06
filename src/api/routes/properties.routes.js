const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/roles");
const upload = require("../middleware/upload");
const propertyController = require("../controllers/property.controller");

// CREATE PROPERTY
router.post(
  "/",
  auth,
  role("admin", "landlord", "caretaker"),
  upload.array("images", 10),
  propertyController.createProperty
);

// GET ALL (admin/caretaker)
router.get(
  "/",
  auth,
  role("admin", "landlord", "caretaker"),
  propertyController.getProperties
);

// GET MINE
router.get(
  "/mine",
  auth,
  role("landlord"),
  propertyController.getMyProperties
);

// GET ONE
router.get("/:id", auth, propertyController.getPropertyById);

// UPDATE
router.put(
  "/:id",
  auth,
  role("landlord"),
  upload.array("images", 10),
  propertyController.updateProperty
);

// DELETE
router.delete(
  "/:id",
  auth,
  role("landlord"),
  propertyController.deleteProperty
);

module.exports = router;
