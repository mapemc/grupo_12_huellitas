const express = require('express');
/* const app = express(); */
const router = express.Router();
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

const userController = require("../controllers/userController.js");


router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/contact", userController.contact);
/*II M.V.A. password reset*/
router.get("/resetting/request", userController.resetPassword)
router.get("/resetting/check-email", userController.resetPasswordEmail) /*check-email?username=mail@algo*/
/*FF M.V.A.*/
/*Multer*/
router.get("/editProfile", userController.editProfile);
/*router.post("/editProfile", uploadFile.single('avatar'), userController.processEditProfile)*/



module.exports = router; 