const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.get("/cart", productController.cart);
router.get("/detail", productController.detail);


/* router.get("/admin", productController.admin); */
router.get("/create", productController.create);


module.exports = router; 