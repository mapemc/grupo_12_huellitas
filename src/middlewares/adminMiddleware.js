function adminMiddleware(req, res, next){
    const loggedUser = req.session.user;
    if(loggedUser && loggedUser.category === "Admin") {
        next();
    } else {
        res.render('notFound.ejs');
    }
}

module.exports = adminMiddleware;
