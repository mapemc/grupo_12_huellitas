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
        const isAdmin = req.session.user && req.session.user.category == "Admin";
        const isRegistered = req.session.user && req.session.user.category == "Customer";
         res.render("products.ejs", {products, isAdmin, isRegistered})
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
      
      const isAdmin = req.session.user && req.session.user.category == "Admin";
      const isRegistered = req.session.user && req.session.user.category == "Customer";
      res.render("productsInsale.ejs", { productosEnOferta, isAdmin, isRegistered});
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
        if(product.category === "Accesorios"){
          accesorios.push(product)} 
      });
      const isAdmin = req.session.user && req.session.user.category == "Admin";
      const isRegistered = req.session.user && req.session.user.category == "Customer";
      res.render("accesorios.ejs", { accesorios, isAdmin, isRegistered});
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
        if(product.category === "Alimentos"){
          alimentos.push(product)} 
      });
      const isAdmin = req.session.user && req.session.user.category == "Admin";
      const isRegistered = req.session.user && req.session.user.category == "Customer";
      res.render("alimentos.ejs", { alimentos, isAdmin, isRegistered});
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
      /* ----------------------- VALIDACION DE NUEVOS PRODUCTOS ---------------- */
      const resultadosdeValidacion = validationResult(req);
      
        if (resultadosdeValidacion.errors.length > 0 ){
         return res.render('adminNewProducts.ejs', {
          errors: resultadosdeValidacion.mapped(),
          oldData: req.body
        })
      }

      try{
        console.log("Entrando en la función create")
        
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

    detail: async (req, res) => {
      try {
          console.log(req);
          // Verificar si el usuario está logueado y es administrador
          const isAdmin = req.session.user && req.session.user.category == "Admin"; // Suponiendo que tienes una propiedad 'isAdmin' en el objeto de usuario
         
          // Obtener el ID del producto desde los parámetros de la ruta
          const productId = req.params.id;
          
          // Consultar la base de datos para obtener los detalles del producto
          const product = await Product.findByPk(productId);
  
          if (!product) {
              return res.status(404).send('Producto no encontrado');
          }
  
          // Renderizar la vista de detalle de producto pasando la información del producto y el estado de administrador
          res.render('productDetail.ejs', { product, isAdmin });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al obtener detalles del producto');
        }
  },

    edit: async (req, res) =>{
      try{
        console.log("Entrando en la función edit");
        const idProduct = req.params.id;
        
        const product = await db.Product.findByPk(idProduct);
        
            if(product) {
                res.render('adminEditProducts.ejs', { product : product })
            } else {
                res.status(404).send('Producto no encontrado');
            }}
          catch(error){
           res.send(error);
          }
    },

    processEdit: async (req, res) => {
  
      try {
        const idProduct = req.params.id;
        const product = await db.Product.findByPk(idProduct);
        
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

          const resultValidation = validationResult(req);

                if (resultValidation.errors.length > 0){
                  return res.render('adminEditProducts', {/*  usar el return para salir de la función después de redirigir */
                    product: product,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                  });
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
        return res.send(error);
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
}
  

module.exports = productController;