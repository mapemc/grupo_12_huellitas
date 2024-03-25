const fs = require('fs');
const path = require('path');
/*const usersFilePath = path.join(__dirname, "../data/users.json");*/
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
/*Encriptado*/
const bcrypt = require('bcryptjs');
/*Validaciones*/
const {validationResult} = require('express-validator');

/*Modelo*/
const User = db.User;

const userController = {
    processRegister: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Errores de validación encontrados:", errors.array());
            const mensajesDeError = errors.array().map(error => ({msg: error.msg}));
            return res.render('register', {mensajesDeError, old: req.body});
        }
        
        try {
            let {username, email, password, category} = req.body;
            username = username.toLowerCase().trim();
            email = email.toLowerCase().trim();
            /*const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));*/
    
            const existingEmail = await User.findOne({ where: { email: email } });
            const existingUsername = await User.findOne({ where: { username: username } });


            if (existingEmail) {
                return res.render('register', { mensajesDeError: [{ msg: 'El correo ya fue registrado' }], old: req.body });
            }
            if (existingUsername) {
                return res.render('register', { mensajesDeError: [{ msg: 'El nombre de usuario ya está en uso' }], old: req.body });
            }
    
            let encriptedPass = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                email,
                password: encriptedPass,
                category: "Customer"
            });
    
            req.session.user = newUser;

/*             User.push(newUser); 
 */            /*fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));*/
    
            res.redirect("/");
        } catch (error) {
            res.status(500).send("Error al registrarse" + error.message);
        }
    },    
    /*Edit form*/
    editProfile: async (req, res) => {
        try {
            if (!req.session || !req.session.user) {
                return res.render('notFound');
            }
            
            const loggedInUser = req.session.user || {}; 
    
            const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
            const provinces = await response.json();
    
            res.render("editProfile", { user: loggedInUser, provinces: provinces.provincias });
            
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    },
    
      
    processEditProfile: async (req, res) => {
        try {
            const loggedInUser = req.session.user.username;
            console.log("Nombre de usuario en sesión:", loggedInUser); 
            const {username, email, password, birthday, phone, street, address, floor, flat, post_code } = req.body;
            const avatar = req.file ? req.file.filename : req.session.user.avatar;
            const updatedPostCode = post_code !== '' ? post_code : null;

            const selectedProvince = req.body.location;

            
            await User.update({
                username,
                email,
                password: password || User.password,
                street,
                address,
                floor,
                flat,
                post_code: updatedPostCode,
                location: selectedProvince,
                avatar,
                phone,
                birthday,                
            }, {
                where: {
                    username: loggedInUser
                }
            });
    
            const updatedUser = await User.findOne({
                where: {
                    username: loggedInUser
                }
            });
    
            if (!updatedUser) {
                throw new Error('No se pudo encontrar el usuario actualizado.');
            }
    
            req.session.user = {
                ...req.session.user,
                ...updatedUser.dataValues
            };
    
            res.redirect(`/users/editProfile/${loggedInUser}`);
        } catch (error) {
            console.error(error);
            console.error('Error al eliminar el perfil:', error);
            res.status(500).send("No se pudo actualizar el perfil");
        }
    },
           
    delete: async (req, res) => {
        try {
            const usernameToDelete = req.params.username;
            const userToDelete = await User.findOne({ where: { username: usernameToDelete } });
            
            if (!userToDelete) {
                return res.status(404).send("Usuario no encontrado");
            }
    
            await userToDelete.destroy();

            req.session.destroy((err) => {
                if (err) {
                    console.error('Error al cerrar la sesión:', err);
                    res.status(500).send("Hubo un error al cerrar la sesión");
                } else {
                    res.redirect('/');
                }
            });            
        } catch (error) {
            console.error('Error al eliminar el perfil:', error);
            res.status(500).send("Hubo un error al eliminar tu perfil");
        }
    },    
    /*II M.V.A. password reset*/
    resetPassword: (req, res) => {
        res.render("passwordRequest.ejs");
    },
    
    resetPasswordEmail: (req, res) => {
        res.render("passwordRequestEmail.ejs");
    },
    /*FF*/
    login: (req, res) => {
        res.render("login", { user: req.session.user });
    },    

    processLogin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Errores de validación encontrados:", errors.array());
            const mensajesDeError = errors.array().map(error => ({msg: error.msg}));
            return res.render('login', {mensajesDeError, old: req.body});
        }
        try {
            let { email, password } = req.body;
            email = email.toLowerCase().trim(); 
            const user = await User.findOne({where: {email}});
    
            if (!user) {
                return res.render('login', {mensajesDeError: [{msg: 'Email no encontrado'}], old: req.body});
            }
    
            if (!bcrypt.compareSync(password, user.password)) {
                return res.render('login', {mensajesDeError: [{msg: 'Contraseña incorrecta' }], old: req.body});
            }
    
            req.session.user = user;
            console.log("Usuario guardado en la sesión:", req.session.user);

            res.redirect('/');
    
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send("Error al iniciar sesión");
        }
    },    
    
    logout: (req, res) => {
        req.session.user = null;
        res.redirect("/");
    },

    register: (req, res) => {
        res.render("register", { user: req.session.user });
    },    
    
 
};


module.exports = userController;