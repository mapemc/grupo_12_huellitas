const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, "../data/users.json");
const bcrypt = require('bcryptjs');



const userController ={
    processRegister: (req, res) =>{
        try {
            const {username, email, password, confirmPassword} = req.body;
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
            const existingUser = users.find(user => user.username === username);
            if (existingUser) {
                return res.status(400).send("El nombre de usuario o el correo electrónico ya están en uso");
            }
            if (password !== confirmPassword) {
                return res.status(400).send("Las contraseñas no coinciden");
            }
                
                const newUser ={
                    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                    username,
                    email,
                    password 
                };

                let encriptedPass = bcrypt.hashSync(password, 10);
                console.log(encriptedPass)
    
                users.push(newUser);
                fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
                
                res.redirect("/");
        } catch (error) {
            console.error(error);
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
            const {username, email, password, street, address, floor, flat, postal, location} = req.body;
            const avatar = req.file ? req.file.filename : '';
            const userIndex = users.findIndex(user => user.id == id);
    
            if (userIndex === -1) {
                return res.status(404).send("Usuario no encontrado");}
    
            const updatedUser = {
                username,
                email,
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

    processLogin: (req, res) =>{
        try {
            const { email, password } = req.body;
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
            const user = users.find(user => user.email === email && user.password === password);
            if (!user) {
                return res.status(401).send("El mail o la contraseña son incorrectas");
            }
            res.redirect("/");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al iniciar sesión");
        }
    },

    register: (req, res) =>{
        res.render("register.ejs"); 
    },
};


module.exports = userController;