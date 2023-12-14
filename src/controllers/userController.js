const path = require('path');



const userController ={
    login: (req, res) =>{
        res.render("login.ejs");
    },

    register: (req, res) =>{
      
      res.render("register.ejs"); 
    },
};


module.exports = userController;