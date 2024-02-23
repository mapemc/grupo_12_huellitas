const express = require('express');
const router = express.Router();


const cartController = require("../controllers/cartController");

router.get("/productCart", cartController.productCart);

module.exports = router;
