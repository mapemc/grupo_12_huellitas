const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

const productController = {

    productsAll: (req, res) =>{
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
      res.render("products", {products})

    },

    create: (req, res) =>{
      res.render("adminNewProducts.ejs")
          
    },

    detail: (req, res) =>{
      
      res.render("productDetail.ejs"); 
    },

    edit: (req, res) =>{
      
      res.render("productDetail.ejs"); 
    },

   delete: (req, res) =>{
      res.render("adminNewProducts.ejs"); 
    },
    

};


module.exports = productController;