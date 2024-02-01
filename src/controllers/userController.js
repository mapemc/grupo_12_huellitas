const path = require('path');



const userController ={
    login: (req, res) =>{
        res.render("login.ejs");
    },

    register: (req, res) =>{
        res.render("register.ejs"); 
    },
    /*Register form*/
    editProfile: (req, res) =>{
        res.render("editProfile.ejs"); 
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
};


module.exports = userController;