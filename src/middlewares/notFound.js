let notFound = true;

function notFound(req, res, next){
    if (notFound == true){
        res.render("notFound.ejs")
    }
    next()
}

module.exports = notFound;