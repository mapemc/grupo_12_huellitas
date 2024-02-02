const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, "../data/users.json");


const userController ={
    processRegister: (req, res) =>{
        try {
        const {username, email, password, confirmPassword} = req.body;
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).send("El nombre de usuario ya está en uso");
        }
        if (password !== confirmPassword) {
            return res.status(400).send("Las contraseñas no coinciden");
        }
  
        const newUser ={
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            username,
            email,
            password,
        }
  
        users.push(newUser);
  
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
          
        res.redirect("/");
    } catch (error) {console.error(error);
        res.status(500).send("Error en el proceso de registro");}
    },
    
    /*Register form*/
    editProfile: (req, res) =>{
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    userToEdit = users.find(user =>{
      return user.id == req.params.id;
    })
    res.render("editProfile", {userToEdit});
    },

    processEditProfile: (req, res) =>{
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

      const id = req.params.id;
      let userToEdit = users.find(user => user.id == id);

      userToEdit = {
        id: userToEdit.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
      }

      let indice = users.findIndex(user =>{
        return user.id == id
      });

      users[indice] = userToEdit;

      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
		  
      res.redirect("/users/editProfile/" + id)
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

    register: (req, res) =>{
        res.render("register.ejs"); 
    },
};


module.exports = userController;