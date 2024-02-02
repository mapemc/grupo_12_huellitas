const express = require('express');
/* const app = express(); */
const path = require('path');
const router = express.Router();
const userController = require("../controllers/userController.js");

/*Agregado multer*/
const multer = require('multer');
const storage = multer.diskStorage(
    {destination: function(req, file, cb)
        {let folder = path.join(__dirname, '../public/img/avatars');
        cb(null, folder);}, /*folder where saved*/
        filename: function(req, file, cb)
        {let imageName = Date.now() + path.extname(file.originalname);
            cb(null, imageName);} /*File name*/
    });
const uploadFile = multer({storage}); /*Execution saved*/


/*REGISTER*/
router.get("/register", userController.register);
router.post("/register", userController.processRegister);

/*LOGIN*/
router.get("/login", userController.login);
router.post("/login", userController.processLogin);

/*II M.V.A. password reset*/
router.get("/resetting/request", userController.resetPassword)
router.get("/resetting/check-email", userController.resetPasswordEmail) /*check-email?username=mail@algo*/
/*FF M.V.A.*/

/*EDIT PROFILE*/
router.get("/editProfile", userController.editProfile);
router.post("/editProfile/:id", uploadFile.single('avatar'), userController.processEditProfile);


/*CONTACTO*/
router.get("/contact", userController.contact);

module.exports = router; 