const express = require('express');
/* const app = express(); */
const path = require('path');
const router = express.Router();
const userController = require("../controllers/userController.js");
/*Validaciones*/
const validationsRegisterUser = require('../validators/userRegisterValidator.js');
const validationsLoginUser = require('../validators/userLoginValidator.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');


/*Agregado multer*/
const multer = require('multer');
const generateFileName = (user, originalname) => {
    const fileNameWithoutExtension = path.parse(originalname).name;
    const fileExt = path.extname(originalname);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    return `${fileNameWithoutExtension}_${timestamp}${fileExt}`;
};
const storage = multer.diskStorage(
    {destination: function(req, file, cb)
        {let folder = path.join(__dirname, '../../public/img/avatars');
        cb(null, folder);}, /*folder where saved*/
        filename: function(req, file, cb) {
            const userToEdit = req.userToEdit || {};
            const imageName = generateFileName(userToEdit, file.originalname);    
            cb(null, imageName);} /*File name*/
    });
const uploadFile = multer({storage}); /*Execution saved*/

/*NAVBAR
router.get('/navbar', userController.navbarViews);*/

/*REGISTER con validaciones*/
router.get("/register", guestMiddleware, userController.register);
router.post("/register", guestMiddleware, validationsRegisterUser, userController.processRegister);


/*LOGIN*/
router.get("/login", userController.login);
router.post("/login", validationsLoginUser, userController.processLogin);

/*II M.V.A. password reset*/
router.get("/resetting/request", userController.resetPassword)
router.get("/resetting/check-email", userController.resetPasswordEmail) /*check-email?username=mail@algo*/
/*FF M.V.A.*/

/*EDIT PROFILE*/
router.get("/editProfile/:id", authMiddleware, (req, res) => {
    // Agrega el console.log aquí para mostrar el contenido de la sesión
    console.log("Contenido de la sesión:", req.session);
    // Llama al controlador para mostrar el formulario de edición de perfil
    userController.editProfile(req, res);
});
router.post("/editProfile/:id", authMiddleware, uploadFile.single('avatar'), userController.processEditProfile);
/*DELETE*/
router.delete("/editProfile/:id/delete", authMiddleware, userController.delete);



/*CONTACTO*/
router.get("/contact", userController.contact);

module.exports = router; 