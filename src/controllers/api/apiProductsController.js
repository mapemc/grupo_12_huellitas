const path = require("path");
const db = require('../../database/models');

const apiProductsController = {
    list: (req, res) =>{
        
        db.Product.findAll()
        .then(products =>{
            let respuesta = {
                    count: products.length,
                    status: 200,
                    countByCategory: {},
                    products: []
            };
        
            // Calcular la cantidad de productos por categoría
            products.forEach(product => {
                // Acceder a la categoría del producto
                const categoryName = product.category;

                // Verificar si la categoría ya existe en el contador
                if (!respuesta.countByCategory[categoryName]) {
                    respuesta.countByCategory[categoryName] = 1;
                } else {
                    respuesta.countByCategory[categoryName]++;
                }

                respuesta.products.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: categoryName, // Agregar la categoría al producto
                    detail: `/api/products/${product.id}`
                });
            });

            res.json(respuesta);
            
        })

        .catch(err => {
            console.error('Error al obtener los productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        });
    },

    detail: (req, res)=>{
        db.Product.findByPk(req.params.id)
        .then(product =>{
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
           
            let respuesta = {
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                color: product.color, // Agregar color del producto
                size: product.size, // Agregar tamaño del producto
                insale: product.insale,
                imageUrl: `/api/products/image/${product.id}` // URL de la imagen del producto
            };
            res.json(respuesta);
        })
        .catch(err => {
            console.error('Error al obtener el detalle del producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        });
    }
};

module.exports = apiProductsController;