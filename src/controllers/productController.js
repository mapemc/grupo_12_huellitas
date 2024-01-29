const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

const productController = {

    productsAll: (req, res) =>{
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
      res.render("products", {products})

    },

    create: (req, res) =>{
      res.render("adminNewProducts.ejs")
          
    },

    processCreate: (req, res) =>{
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

      const newproduct ={
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        detail: req.body.detail,
        photos: req.body.photos,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        color: req.body.color,
        sizes: req.body.sizes,
      }

      products.push(newproduct);

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

      res.redirect("/");
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