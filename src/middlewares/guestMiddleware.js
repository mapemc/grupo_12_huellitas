function guestMiddleware(req, res, next){
    if(req.session.user === undefined) {
        next();
    } else {
        res.render('notFound.ejs');
    }
}

module.exports = guestMiddleware;