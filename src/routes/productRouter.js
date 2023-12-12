const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.get("/carrito", productController.carrito);
router.get("/detalle", productController.detalle);




module.exports = router; 