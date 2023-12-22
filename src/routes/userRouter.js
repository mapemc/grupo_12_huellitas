const express = require('express');
/* const app = express(); */
const router = express.Router();

const userController = require("../controllers/userController.js");


router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/contact", userController.contact);





module.exports = router; 