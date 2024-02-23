const path = require('path');

const cartController = {
    productCart:  (req, res) =>{
        res.render('productCart.ejs');
    },
}

module.exports = cartController;