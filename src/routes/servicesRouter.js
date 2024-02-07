const express = require('express');
const router = express.Router();

const servicesController = require("../controllers/servicesController.js");

router.get("/services", servicesController.vet)
/* 
router.get("/create", productController.create);
router.post("/create", productController.processCreate); */





module.exports = router; 