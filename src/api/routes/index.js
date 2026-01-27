const express = require("express");
const auth = require("../middleware/auth");

const userController = require("../controllers/user.controller");
const propertyController = require("../controllers/property.controller");
const tenantController = require("../controllers/tenant.controller");
const app = express();

const router = express.Router();
const authRoutes = require("./auth.routes");
app.use("/api/auth", authRoutes);

// User routes
router.get("/user/profile", auth, userController.getUserProfile);
router.put("/user/profile", auth, userController.updateUserProfile);
router.delete("/user/profile", auth, userController.deleteUserProfile);

// Property routes
router.post("/properties", auth, propertyController.createProperty);
router.get("/properties", auth, propertyController.getProperties);
router.get("/properties/:id", auth, propertyController.getPropertyById);
router.put("/properties/:id", auth, propertyController.updateProperty);
router.delete("/properties/:id", auth, propertyController.deleteProperty);

// Tenant routes
router.post("/tenants", auth, tenantController.addTenant);
router.get("/tenants", auth, tenantController.getTenants);
router.get("/tenants/:id", auth, tenantController.getTenantById);
router.put("/tenants/:id", auth, tenantController.updateTenant);
router.delete("/tenants/:id", auth, tenantController.deleteTenant);

module.exports = router;