const express = require('express');
/* const app = express(); */
const router = express.Router();

const userController = require("../controllers/userController.js");


router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/contact", userController.contact);
/*II M.V.A. password reset*/
router.get("/resetting/request", userController.resetPassword)
router.get("/resetting/check-email", userController.resetPasswordEmail) /*check-email?username=mail@algo*/
/*FF M.V.A.*/



module.exports = router; 