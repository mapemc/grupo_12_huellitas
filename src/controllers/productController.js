const path = require('path');


const productController ={
    carrito: (req, res) =>{
        res.render("productCart.ejs");
    },

    detalle: (req, res) =>{
      
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