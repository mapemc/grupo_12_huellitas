const path = require('path');


const productController ={
    carrito: (req, res) =>{
        res.sendFile(path.resolve(__dirname, "../views/productCart.html"));
    },

    detalle: (req, res) =>{
      
      res.sendFile(path.resolve(__dirname, "../views/productDetail.html")); 
    },
};


module.exports = productController;