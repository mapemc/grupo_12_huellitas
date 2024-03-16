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
    body('name').notEmpty().withMessage ('Ingresa nombre de producto'),
    body('description').notEmpty() .withMessage ('Ingresa una descripción del producto'),
    body('price').notEmpty() .withMessage ('Ingresa el valor del producto'),
    body('stock').notEmpty() .withMessage ('Ingresa la cantidad de productos en stock'),
    body("photo").custom((value, { req })=>{
        let file= req.file
        console.log(req.file)
        let acceptedExtensions= [".jpg", ".png", ".jpeg", ".gif"];

        if (!file) {
          throw new Error ("Tienes que subir una imagen del producto");
        }else{
          let fileExtension = path.extname(file.originalname.toLowerCase());
          if(!acceptedExtensions.includes(fileExtension)){
            throw new Error ("Las extensiones permitidas son .jpg, .png, .jpeg, .gif");
          }
        }
        return true
      })
];

//---------------------RUTAS---------------------------------------
router.get("/products", productController.productsAll)
router.get("/create", productController.create);
router.post("/create", uploadFile.single("photo"), productController.processCreate);
router.get("/detail/:id", productController.detail);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", uploadFile.single("photo"), validaciones, productController.processEdit);
router.delete("/delete/:id", productController.destroy); 

/////rutas por categoría de productos/////
router.get("/insale", productController.ofertas)
router.get("/accesories", productController.accesorios)
router.get("/food", productController.alimentos)




module.exports = router; 