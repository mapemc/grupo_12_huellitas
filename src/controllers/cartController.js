const path = require("path");

const cartController = {
    carrito:  (req, res) =>{
        res.render("productCart.ejs");
    },
}

module.exports = cartController;
