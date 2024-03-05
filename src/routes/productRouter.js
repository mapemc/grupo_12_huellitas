const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require("../controllers/productController.js");

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

//----------------VALIDATOR---------------------------------
const {body} = require('express-validator');
const validaciones = [
    body('nombre').notEmpty().withMessage ('Ingresa nombre de producto'),
    body('stock').notEmpty() .withMessage ('Ingresa cuántos productos hay en stock'),
    body('price').notEmpty() .withMessage ('Ingresa el valor del producto'),
    body('category').notEmpty() .withMessage ('Ingresa cuál es la categoría del producto'),
];

//---------------------RUTAS---------------------------------------
router.get("/products", productController.productsAll)
router.get("/create", productController.create);
router.post("/create", uploadFile.single("photo"), productController.processCreate);
router.get("/detail/:id", productController.detail);
router.get("/edit/:id", productController.edit);
router.post("/edit/:id", uploadFile.single("photo"), validaciones, productController.processEdit);
router.delete("/delete/:id", productController.destroy); 

/////rutas por categoría de productos/////
router.get("/insale", productController.ofertas)
router.get("/accesories", productController.accesorios)
router.get("/food", productController.alimentos)




module.exports = router; 