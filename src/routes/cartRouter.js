const express = require('express');
const path = require('path');
const router = express.Router();
const cartController = require("../controllers/cartController.js");

router.get("/productCart", cartController.carrito);


module.exports = router;

