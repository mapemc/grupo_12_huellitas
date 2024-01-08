const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.get("/products", productController.productsAll)
router.get("/create", productController.create);
router.get("/detail", productController.detail);
router.get("/edit", productController.edit);
router.get("/delete", productController.delete);



module.exports = router; 