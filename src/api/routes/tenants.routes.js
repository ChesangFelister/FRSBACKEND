const express = require("express");
const router = express.Router();
const controller = require("../controllers/tenant.controller");
const auth = require("../middleware/auth");

router.get("/", auth, controller.getTenants);
router.post("/", auth, controller.addTenant);
router.delete("/:id", auth, controller.deleteTenant);

module.exports = router;
