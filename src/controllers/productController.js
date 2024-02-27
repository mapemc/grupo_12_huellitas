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
        photo: req.file.filename,
        color: req.body.color,
        size: req.body.size,
        description: req.body.description,
        insale: insaleValue,
        });

        //console.log("Producto creado con éxito");

        res.redirect("/products/products")
      }
      catch(error){
        res.send(error);
      } 
    },

    detail: (req, res) => {
      db.Product.findByPk(req.params.id)
          .then(product => {
              res.render('productDetail.ejs', {product});
          });
    },

    edit: async (req, res) =>{
      try{
        console.log("Entrando en la función edit");
        const idProduct = req.params.id;
        
        const product = await db.Product.findByPk(idProduct);
        
            if(product) {
                res.render('adminEditProducts.ejs', {product})
            } else {
                res.status(404).send('Producto no encontrado');
            }}
      catch(error){
        res.send(error);
      }
    },

    processEdit: async (req, res) => {
      try{
        const idProduct = req.params.id;
        const product = await db.Product.findByPk(idProduct);

        const insaleValue = req.body.inSale === 'true' ? 1 : 0;

        if (product){
            db.Product.update(
                {
                  name: req.body.name,
                  category: req.body.category,
                  price: req.body.price,
                  stock: req.body.stock,
                  photo: req.file.filename,
                  color: req.body.color,
                  size: req.body.size,
                  description: req.body.description,
                  insale: insaleValue,
                },
                {
                    where: {id: idProduct}
                });
          res.redirect('/products/products')
        }
      }
      catch(error){
        console.error('Error:', error);
        res.send(error);
      };
    },
    
    destroy: async (req, res) =>{
      try{
        const idProduct = req.params.id;
        const product = await db.Product.findByPk(idProduct);

        if(product){
            db.Product.destroy({
                where: {id: idProduct}
            })        
        res.redirect('/products/products')
        }
      }
      catch(error){
        res.send(error);
      };
    }, 
};


module.exports = productController;