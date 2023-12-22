const path = require('path');


const productController ={
    cart: (req, res) =>{
        res.render("productCart.ejs");
    },

    detail: (req, res) =>{
      
      res.render("productDetail.ejs"); 
    },

    admin: (req, res) =>{
      res.render("admin.ejs"); 
    },
    
    create: (req, res) =>{
      res.render("adminNewProducts.ejs")
    },


};


module.exports = productController;