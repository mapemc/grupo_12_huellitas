const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, "../data/users.json");
/*Encriptado*/
const bcrypt = require('bcryptjs');
/*Validaciones*/
const {validationResult} = require('express-validator');

const userController = {
    processRegister: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Errores de validación encontrados:", errors.array());
            const mensajesDeError = errors.array().map(error => ({msg: error.msg}));
            return res.render('register', {mensajesDeError, old: req.body});
        }
        
        try {
            let { username, email, password } = req.body;
            username = username.toLowerCase().trim();
            email = email.toLowerCase().trim();
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
            // Verificar si el correo electrónico o el nombre de usuario ya existen
            const existingEmail = users.find(user => user.email === email);
            const existingUsername = users.find(user => user.username === username);
            if (existingEmail) {
                return res.render('register', { mensajesDeError: [{ msg: 'El correo ya fue registrado' }], old: req.body });
            }
            if (existingUsername) {
                return res.render('register', { mensajesDeError: [{ msg: 'El nombre de usuario ya está en uso' }], old: req.body });
            }
    
            let encriptedPass = bcrypt.hashSync(password, 10);
    
            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                username,
                email,
                password: encriptedPass
            };
    
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    
            res.redirect("/");
        } catch (error) {
            res.status(500).send("Error al registrarse");
        }
    },    
    /*Register form*/
    editProfile: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const userToEdit = users.find(user => user.id == req.params.id);
        res.render("editProfile", {userToEdit});
    },

    processEditProfile: (req, res) => {
        try {
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            const id = req.params.id;
            const {username, email, password, birthday, phone, street, address, floor, flat, postal, location} = req.body;
            const avatar = req.file ? req.file.filename : '';
            const userIndex = users.findIndex(user => user.id == id);
    
            if (userIndex === -1) {
                return res.status(404).send("Usuario no encontrado");}
    
            const updatedUser = {
                username,
                email,
                birthday,
                phone,
                password,
                street,
                avatar,
                address,
                floor,
                flat,
                postal,
                location};
    
            users[userIndex] = {
                ...users[userIndex], 
                ...updatedUser};
    
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    
            res.redirect(`/users/editProfile/${id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send("No se pudo actualizar el perfil");
        }
    },
    delete: (req, res) => {
        try {
            let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            users = users.filter(user => user.id != req.params.id);
    
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
            res.redirect('/');
            return
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
    contact: (req, res) =>{
        res.render("contact.ejs");
    },

    login: (req, res) =>{
        res.render("login.ejs");
    },

    processLogin: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Errores de validación encontrados:", errors.array());
            const mensajesDeError = errors.array().map(error => ({ msg: error.msg }));
            return res.render('login', { mensajesDeError, old: req.body });
        }
        try {
            let { email, password } = req.body;
            email = email.toLowerCase().trim();
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            console.log(users);
    
            const user = users.find(user => user.email === email);
            console.log(user.password);
    
            if (!user) {
                return res.render('login', { mensajesDeError: [{ msg: 'Email no encontrado' }], old: req.body });
            }
    
            if (!bcrypt.compareSync(password, user.password)) {
                return res.render('login', { mensajesDeError: [{ msg: 'Contraseña incorrecta' }], old: req.body });
            }
    
            req.session.user = user;
    
            res.redirect("/");
    
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send("Error al iniciar sesión");
        }
    },    

    register: (req, res) =>{
        res.render("register.ejs"); 
    },
    
    /*renderNavbar: (req, res, next) => {
        const userIsLoggedIn = req.isAuthenticated(); 

        res.render('navbar', { userIsLoggedIn });
    },*/
};


module.exports = userController;