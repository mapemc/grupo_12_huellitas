const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.get("/carrito", productController.carrito);
router.get("/detalle", productController.detalle);


router.get("/admin", productController.admin);
router.get("/create", productController.create);


module.exports = router; 