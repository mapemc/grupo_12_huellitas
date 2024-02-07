const express = require('express');
const router = express.Router();

const servicesController = require("../controllers/servicesController.js");

router.get("/services/guarderia", servicesController.guarderia)
router.get("/services/peluqueria", servicesController.peluqueria)
router.get("/services/veterinarios", servicesController.veterinarios)
/* 
router.get("/create", productController.create);
router.post("/create", productController.processCreate); */





module.exports = router; 