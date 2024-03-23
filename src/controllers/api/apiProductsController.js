const path = require("path");
const db = require('../../database/models');

const apiProductsController = {
    list: (req, res) =>{
        
        db.Product.findAll()
        .then(products =>{
            let respuesta = {
                meta:{
                    status: 200,
                    total: products.length,
                    url: "/api/products/",
                },
                data: products
            }
            res.json(products)
        })
    }
 

}

module.exports = apiProductsController;