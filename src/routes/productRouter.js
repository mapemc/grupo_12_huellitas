const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");
const adminMiddleware = require('../middlewares/adminMiddleware.js');


router.get("/products", productController.productsAll)
router.get("/create", adminMiddleware, productController.create);
router.post("/create", adminMiddleware, productController.processCreate);

router.get("/detail/:id", adminMiddleware, productController.detail);

router.get("/edit/:id", adminMiddleware, productController.edit);
router.post("/edit/:id", adminMiddleware, productController.processEdit)

router.delete("/delete/:id", adminMiddleware, productController.destroy);




module.exports = router; 