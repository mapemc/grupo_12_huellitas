const path = require('path');


const productController ={
    carrito: (req, res) =>{
        res.render("productCart.ejs");
    },

    detalle: (req, res) =>{
      
      res.render("productDetail.ejs"); 
    },
};


module.exports = productController;