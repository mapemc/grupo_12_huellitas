const express = require("express");
const app = express();
const router = express.Router();


const mainController = require("../controllers/mainController.js");

router.get("/", mainController.index);

router.get('/pruebaSession',function(req,res){
    if(req.session.numeroVisitas== undefined){
        req.session.numeroVisitas = 0
    }
    req.session.numeroVisitas++
    res.send('Session tiene el numero: ' + req.session.numeroVisitas)

})

module.exports = router; 