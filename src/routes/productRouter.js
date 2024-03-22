const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require("../controllers/productController.js");
const adminMiddleware = require('../middlewares/adminMiddleware.js');
const { body } = require('express-validator');
const validationsEditProduct = require('../validators/productEditValidator.js');
const validationsNewProduct = require('../validators/productNewValidator.js');

//--------------------*Agregado multer-----------------------*/
const multer = require('multer');
const storage = multer.diskStorage(
    {destination: function(req, file, cb){
        cb(null, "public/img");}, /*folder where saved*/
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        ;} /*File name*/
    });

const uploadFile = multer({ storage:storage }); /*Execution saved*/


//---------------------RUTAS---------------------------------------
router.get("/products", productController.productsAll)
router.get("/create", adminMiddleware, productController.create);
router.post("/create", adminMiddleware, uploadFile.single("photo"),validationsNewProduct, productController.processCreate);
router.get("/detail/:id", productController.detail);
router.get("/edit/:id", adminMiddleware, productController.edit);
router.put("/edit/:id", adminMiddleware, uploadFile.single("photo"), validationsEditProduct, productController.processEdit);
router.delete("/delete/:id", adminMiddleware, productController.destroy); 

/////rutas por categoría de productos/////
router.get("/insale", productController.ofertas)
router.get("/accesories", productController.accesorios)
router.get("/food", productController.alimentos)



module.exports = router; 
