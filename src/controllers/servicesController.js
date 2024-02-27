const fs = require('fs');
const path = require('path');
//const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

const servicesController = {
    guarderia: (req, res) =>{
        res.render("formGuarderia");
    },

    peluqueria: (req, res) =>{
        res.render("formPeluqueria");
    },

    veterinaria: (req, res) =>{
        res.render("formVeterinaria");
    },
}

module.exports = servicesController;