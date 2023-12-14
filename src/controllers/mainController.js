const path = require("path");


const mainController ={
    index: (req, res) =>{
        res.render("index.ejs");
    }
};


module.exports = mainController;