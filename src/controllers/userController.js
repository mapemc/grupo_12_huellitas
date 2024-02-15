const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, "../data/users.json");
const bcrypt = require('bcryptjs');



const userController ={
    processRegister: (req, res) => {
        try {
            const { username, email, password, confirmPassword } = req.body;
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

            const existingUsername = users.find(user => user.username === username);
            const existingEmail = users.find(user => user.email === email);
    
            if (existingUsername || existingEmail) {
                return res.status(400).send("El nombre de usuario o el correo electrónico ya están en uso");}
            
            if (password !== confirmPassword) {
                return res.status(400).send("Las contraseñas no coinciden");}
    
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
    try {
        const { email, password } = req.body;
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).send("El correo electrónico o la contraseña son incorrectos");}

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("El correo electrónico o la contraseña son incorrectos");}

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al iniciar sesión");
    }
    },

    register: (req, res) =>{
        res.render("register.ejs"); 
    },
    
    renderNavbar: (req, res, next) => {
        const userIsLoggedIn = req.isAuthenticated(); 

        res.render('navbar', { userIsLoggedIn });
    },
};


module.exports = userController;