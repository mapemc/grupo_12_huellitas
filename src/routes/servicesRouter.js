const express = require('express');
const router = express.Router();

/* const {check} = require('express-validator');

const validationsRegisterUser = [
    check('nombre')
        .isLength({ min: 4, max: 16 })
        .withMessage('El campo nombre debe contener entre 4 y 16 caracteres')
        .bail(),

    check('apellido')
        .isLength({ min: 2, max: 16 })
        .withMessage('El campo apellido debe contener entre 2 y 16 caracteres')
        .bail(),
    
    check('email')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .bail(),

    check('telefono')
        .isInt()
        .withMessage('Debe ser un número válido')
        .bail()
    
] */




const servicesController = require("../controllers/servicesController.js");

router.get("/services/guarderia", servicesController.guarderia)
router.get("/services/peluqueria", servicesController.peluqueria)
router.get("/services/veterinaria", servicesController.veterinaria)
/* 
router.get("/create", productController.create);
router.post("/create", productController.processCreate); */





module.exports = router; 