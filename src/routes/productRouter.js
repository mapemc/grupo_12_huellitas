const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.get("/products", productController.productsAll)
router.get("/create", productController.create);
router.post("/create", productController.processCreate);

router.get("/detail/:id", productController.detail);

router.get("/edit/:id", productController.edit);
router.post("/edit/:id", productController.processEdit)

router.delete("/delete/:id", productController.destroy);




module.exports = router; 