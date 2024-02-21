function guestMiddleware(req, res, next){
    if(req.session.loggedUser === undefined) {
        next();
    } else {
        res.render('notFound.ejs');
    }
}

module.exports = guestMiddleware;