const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//////Llamado a los modelos///////////
const Pet = db.Pet;
const Product = db.Product;
const Service = db.Service;
const User = db.User;


const productController = {

    productsAll: async (req, res) =>{
      await db.Product.findAll()
      .then(products =>{
        res.render("products.ejs", {products})
      })
    },

    create: (req, res) =>{
      res.render("adminNewProducts.ejs")
          
    },

    processCreate: async (req, res) =>{
      try{
        //console.log("Entrando en la función create");
        const insaleValue = req.body.inSale === 'true' ? 1 : 0;

        await db.Product.create({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        photo: req.body.photo,
        color: req.body.color,
        size: req.body.size,
        description: req.body.description,
        insale: insaleValue,
        });

        console.log("Producto creado con éxito");

        res.redirect("/products")
    }
    catch(error){
        res.send(error);
    } 
    },

    detail: (req, res) => {
     
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  
      const singleProduct = products.find(product => {
        return product.id == req.params.id
      })
      
      res.render("productDetail.ejs", {singleProduct});
    },

    edit: (req, res) =>{
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    productToEdit = products.find(product =>{
      return product.id == req.params.id;
    })
    res.render("adminEditProducts", {productToEdit});
    },

    processEdit: (req, res) => {
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

      const id = req.params.id;
      let productToEdit = products.find(product => product.id == id);

      productToEdit = {
        id: productToEdit.id,
        name: req.body.name,
        detail: req.body.detail,
        photos: req.body.photos,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        color: req.body.color,
        sizes: req.body.sizes,
      }

      let indice = products.findIndex(product =>{
        return product.id == id
      });

      products[indice] = productToEdit;

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		  
      res.redirect("/products/products")
    },

    
    destroy: (req, res) =>{
      let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

      products = products.filter (product =>{
        return product.id != req.params.id
      });

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

      res.redirect("/products/products");
    },
    

};


module.exports = productController;