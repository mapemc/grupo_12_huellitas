const express = require('express');
/* const app = express(); */
const fs = require('fs');
const path = require('path');
const router = express.Router();
const usersFilePath = path.join(__dirname, "../data/users.json");
const userController = require("../controllers/userController.js");
/*Validaciones y sesiones*/
const validationsRegisterUser = require('../validators/userRegisterValidator.js');
const validationsLoginUser = require('../validators/userLoginValidator.js');
const validationsEditProfile = require('../validators/userEditValidator.js');
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
router.get("/login", guestMiddleware, userController.login);
router.post("/login", guestMiddleware, validationsLoginUser, userController.processLogin);

/*II M.V.A. password reset*/
router.get("/resetting/request", userController.resetPassword)
router.get("/resetting/check-email", userController.resetPasswordEmail) /*check-email?username=mail@algo*/
/*FF M.V.A.*/

/*EDIT PROFILE*/
router.get("/editProfile/:username", authMiddleware, validationsEditProfile, (req, res) => {
    const username = req.params.username;
    const loggedInUsername = req.session.user.username;

    if (username !== loggedInUsername) {
        return res.render('notFound');
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const userToEdit = users.find(user => user.username === username);
    res.render("editProfile", {userToEdit});
});
router.post("/editProfile/:username", authMiddleware, validationsEditProfile, uploadFile.single('avatar'), userController.processEditProfile);
/*DELETE*/
router.delete("/editProfile/:username/delete", authMiddleware, userController.delete);



/*CONTACTO*/
router.get("/contact", userController.contact);

module.exports = router; 