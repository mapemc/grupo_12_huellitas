function authMiddleware(req, res, next){
    console.log("Middleware de autenticación ejecutándose...");
    if(req.session.loggedUser !== undefined) {
        console.log("Usuario autenticado:", req.session.loggedUser);
        next();
    } else {
        console.log("Usuario no autenticado");
        res.redirect('/users/login');
    }
}

module.exports = authMiddleware;