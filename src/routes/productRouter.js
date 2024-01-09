const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.get("/products", productController.productsAll)
router.get("/create", productController.create);
router.get("/detail/:id/", productController.detail);
router.get("/:id/edit", productController.edit);
router.get("/delete", productController.delete);

router.post("/create", productController.processCreate);

module.exports = router; 