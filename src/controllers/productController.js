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
//----------------VALIDACIÓN--------------
const {validationResult}= require('express-validator');

const productController = {

     productsAll: async (req, res) =>{
      await db.Product.findAll()
      .then(products =>{
        const user = req.session.user;
        res.render("products.ejs", {products, user})
      })
    },
    
    ofertas: async (req, res) =>{
    
      let products = await db.Product.findAll();
      let productosEnOferta = [];

      try{
      products.forEach(product => {
        if(product.insale === 1){
          productosEnOferta.push(product)} 
      });
      res.render("productsInsale.ejs", { productosEnOferta});
      }
       
      catch(error){
        res.send(error);
      }   
    },  

    accesorios: async (req, res) =>{
    
      let products = await db.Product.findAll();
      let accesorios = [];

      try{
      products.forEach(product => {
        if(product.category === "accesories"){
          accesorios.push(product)} 
      });
      res.render("accesorios.ejs", { accesorios});
      }
       
      catch(error){
        res.send(error);
      }   
    },  

    alimentos: async (req, res) =>{
    
      let products = await db.Product.findAll();
      let alimentos = [];

      try{
      products.forEach(product => {
        if(product.category === "food"){
          alimentos.push(product)} 
      });
      res.render("alimentos.ejs", { alimentos});
      }
       
      catch(error){
        res.send(error);
      }   
    },  

    create: (req, res) =>{
      res.render("adminNewProducts.ejs")     
    },
//------------VALIDACIÓN DE NUEVOS PRODUCTOS

    processCreate: async (req, res) =>{
      try{
        //console.log("Entrando en la función create");
        
        //const insaleValue = req.body.inSale === 1 ? 1 : 0;

        await db.Product.create({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        photo: req.file.filename,
        color: req.body.color,
        size: req.body.size,
        description: req.body.description,
        insale: req.body.insale,
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

        //const insaleValue = req.body.inSale === 1 ? 1 : 0;

                if (product) {
                  const updateData = {
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    stock: req.body.stock,
                    color: req.body.color,
                    size: req.body.size,
                    description: req.body.description,
                    insale: req.body.insale,
                  };
            
                 
                if (req.file) {
                  // Si se ha subido una nueva imagen, utiliza la nueva imagen
                  updateData.photo = req.file.filename;
                } else {
                  // Si no mantiene la imagen existente
                  updateData.photo = product.photo;
                }

                //  actualización en la base de datos
                await db.Product.update(updateData, {
                  where: { id: idProduct },
                });
          res.redirect('/products/products')
        }

      }
      catch(error){
        console.error('Error:', error);
        res.send(error);
      };
    },
    //--------- VALIDACION DE EDICIÓN DE PRODUCTOS ----------------
    validacionEdit: (req, res) => {
      const resultadosdeValidacion = validationResult(req);
      if (resultadosdeValidacion.errors.length > 0 ){
        return res.render('adminEditProducts.ejs', {
          errors: resultadosdeValidacion.mapped(),
          oldData: req.body
        });
      }
      
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